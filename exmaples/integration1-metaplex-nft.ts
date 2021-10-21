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
  SplNft
} from '../src/index';

import {RandomAsset} from '../test/utils/randomAsset';

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET 
  //////////////////////////////////////////////

  // create nft owner wallet, receive nft receipt wallet.
  const publish = await Wallet.create();
  const receipt = await Wallet.create();

  // faucet 1 sol
  await Wallet.requestAirdrop(publish.pubkey.toPubKey());
  console.log('# publish: ', publish);
  console.log('# receipt: ', receipt);


  //////////////////////////////////////////////
  // Upload contents 
  //////////////////////////////////////////////

  // Only test that call this function   
  // Usually set custom param
  const asset = RandomAsset.storage();

  console.log('# asset: ', asset);

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

  const res = await Metaplex.mint(data, publish.secret.toKeypair());

  if (res.isErr) {
    console.error(res.error);
    process.exit(1);
  }

  const mintResult = res.unwrap();

  // this is NFT ID
  console.log('# tokenKey: ', mintResult.tokenKey);

  // untile completed in blockchain
  await Transaction.confirmedSig(mintResult.signature);

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

  // transfer nft to receipt wallet
  const transferSig = await SplNft.transfer(
    mintResult.tokenKey.toPubKey(),
    publish.secret.toKeypair(),
    receipt.pubkey.toPubKey()
  );

  if (transferSig.isErr) {
    console.error(transferSig.error);
    process.exit(1);
  }

  console.log('# Transfer nft sig: ', transferSig.unwrap().toSigUrl());

})();
