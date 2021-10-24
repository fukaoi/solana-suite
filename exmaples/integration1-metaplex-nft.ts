//////////////////////////////////////////////
//$ npx ts-node exmaples/integration1-metaplex-nft.ts
//////////////////////////////////////////////

import {
  Wallet,
  Transaction,
  Metaplex,
  MetaplexInstructure,
  MetaplexMetaData,
  StorageNftStorage,
  SplNft,
} from '../src/index';

import {RandomAsset} from '../test/utils/randomAsset';

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET 
  //////////////////////////////////////////////

  // create nft owner wallet, receive nft receipt wallet.
  const publish = Wallet.create();
  const receipt = Wallet.create();
  const feePayer = Wallet.create();

  // faucet 1 sol
  await Wallet.requestAirdrop(feePayer.pubkey.toPubKey());
  console.log('# publish: ', publish.pubkey);
  console.log('# receipt: ', receipt.pubkey);
  console.log('# feePayer: ', feePayer.pubkey);


  //////////////////////////////////////////////
  // Upload contents 
  //////////////////////////////////////////////

  // Only test that call this function   
  // Usually set custom param
  const asset = RandomAsset.storage();

  // metadata and image upload
  const url = await StorageNftStorage.upload(asset);

  if (url.isErr) {
    console.error(url.error);
    process.exit(1);
  }

  //////////////////////////////////////////////
  // CREATE NFT, MINT NFT FROM THIS LINE 
  //////////////////////////////////////////////

  const data = new MetaplexInstructure.Data({
    name: asset.name,
    symbol: 'SAMPLE',
    uri: url.unwrap(),
    sellerFeeBasisPoints: 100,
    creators: null
  });

  const res = await Metaplex.mint(data, feePayer.secret.toKeypair());

  res.match(
    async (value) => await Transaction.confirmedSig(value.signature, 'finalized'),
    (error) => {
      console.error(error);
      process.exit(1);
    }
  );

  // this is NFT ID
  const mintResult = res.unwrap();
  console.log('# tokenKey: ', mintResult.tokenKey);

  //////////////////////////////////////////////
  // Display metadata from blockchain(optional)
  //////////////////////////////////////////////

  const metadata = await MetaplexMetaData.getByTokenKey(
    mintResult.tokenKey.toPubKey()
  );
  console.log('# metadata: ', metadata.unwrap());

  //////////////////////////////////////////////
  // TRANSFER RECEIPR USER FROM THIS LINE 
  //////////////////////////////////////////////

  // transfer nft to  wallet
  const sig = await SplNft.transfer(
    mintResult.tokenKey.toPubKey(),
    feePayer.pubkey.toPubKey(),
    publish.pubkey.toPubKey()
  )({
    feePayer: feePayer.pubkey.toPubKey(),
    signers: [feePayer.secret.toKeypair()]
  });

  sig.match(
    async (value) => {
      console.log('# Transfer nft sig: ', value.toSigUrl());
      await Transaction.confirmedSig(value, 'finalized');
    },
    (error) => console.error(error)
  );

  // transfer nft to receipt wallet
  const sig2 = await SplNft.transfer(
    mintResult.tokenKey.toPubKey(),
    publish.pubkey.toPubKey(),
    receipt.pubkey.toPubKey()
  )({
    feePayer: feePayer.pubkey.toPubKey(),
    signers: [feePayer.secret.toKeypair(), publish.secret.toKeypair()]
  });

  sig2.match(
    (value) => console.log('# Transfer nft sig2: ', value.toSigUrl()),
    (error) => console.error(error)
  );
})();
