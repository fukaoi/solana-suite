//////////////////////////////////////////////
//$ npx ts-node exmaples/integration1-metaplex-nft.ts
//////////////////////////////////////////////

import assert from 'assert';
import {
  Account,
  Transaction,
  Metaplex,
  MetaplexInstructure,
  MetaplexMetaData,
  StorageNftStorage,
  SplToken,
  Pubkey,
} from '../src/index';

import {RandomAsset} from '../test/utils/randomAsset';

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET 
  //////////////////////////////////////////////

  // create nft owner wallet, receive nft receipt wallet.
  const publisher = Account.create();
  const receipt = Account.create();
  const owner = Account.create();

  // faucet 1 sol
  await Account.requestAirdrop(owner.toPubkey());

  console.log('# publisher: ', publisher.pubkey);
  console.log('# receipt: ', receipt.pubkey);
  console.log('# owner(feePayer): ', owner.pubkey);


  //////////////////////////////////////////////
  // Upload contents 
  //////////////////////////////////////////////

  // Only test that call this function   
  // Usually set custom param
  const asset = RandomAsset.storage();

  // metadata and image upload
  const url = await StorageNftStorage.upload(asset);

  if (url.isErr) {
    assert(url.error);
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

  const inst1 = await Metaplex.mint(
    data,
    owner.toPubkey(),
    [owner.secret.toKeypair()]
  );

  // this is NFT ID
  (await inst1.submit()).match(
    async (value) => await Transaction.confirmedSig(value, 'finalized'),
    (error) => assert(error)
  );

  const tokenKey = (inst1.unwrap().data as Pubkey);
  console.log('# tokenKey: ', tokenKey);

  //////////////////////////////////////////////
  // Display metadata from blockchain(optional)
  //////////////////////////////////////////////

  const metadata = await MetaplexMetaData.getByTokenKey(
    tokenKey.toPubkey()
  );

  metadata.match(
    (value) => console.log('# metadata: ', value),
    (error) => assert(error)
  );

  //////////////////////////////////////////////
  // TRANSFER RECEIPR USER FROM THIS LINE 
  //////////////////////////////////////////////

  // transfer nft owner => publish
  const inst2 = await SplToken.transferNft(
    tokenKey.toPubkey(),
    owner.toPubkey(),
    publisher.toPubkey(),
    [
      owner.toKeypair()
    ],
  );


  // transfer nft publish => receipt
  const inst3 = await SplToken.transferNft(
    tokenKey.toPubkey(),
    publisher.toPubkey(),
    receipt.toPubkey(),
    [
      publisher.toKeypair(),
    ],
    owner.toKeypair() //feePayer
  );

  // submit batch instructions
  (await [inst2, inst3].submit()).match(
    (value) => console.log('# Transfer nft sig: ', value.toSigUrl()),
    (error) => assert(error)
  );
})();
