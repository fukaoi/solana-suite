//////////////////////////////////////////////
// $ npx ts-node examples/integration1-metaplex-nft.ts
//////////////////////////////////////////////

import assert from 'assert';
import {
  Account,
  Transaction,
  SplToken,
  Pubkey,
} from '@solana-suite/core';

import {
  Metaplex,
  MetaplexInstructure,
  MetaplexMetaData,
  StorageNftStorage,
} from '@solana-suite/nft';

import {RandomAsset} from '../packages/nft/test/randomAsset'

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // create nft owner wallet, receive nft receipt wallet.
  const publisher = Account.create();
  const receipt = Account.create();
  const owner = Account.create();

  // faucet 1 sol
  await Account.requestAirdrop(owner.toPublicKey());

  console.log('# publisher: ', publisher.pubkey);
  console.log('# receipt: ', receipt.pubkey);
  console.log('# owner(feePayer): ', owner.pubkey);


  //////////////////////////////////////////////
  // Upload contents
  //////////////////////////////////////////////

  // Only test that call this function
  // Usually set custom param
  const asset = RandomAsset.storage();

  console.log(asset);

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

  console.log(owner.toPublicKey());

  const inst1 = await Metaplex.mint(
    data,
    owner.toPublicKey(),
    [owner.toKeypair()]
  );

  // this is NFT ID
  (await inst1.submit()).match(
    async (value) => await Transaction.confirmedSig(value, 'finalized'),
    (error) => assert(error)
  );

  const mint = (inst1.unwrap().data as Pubkey);
  console.log('# mint: ', mint);

  //////////////////////////////////////////////
  // Display metadata from blockchain(optional)
  //////////////////////////////////////////////

  const metadata = await MetaplexMetaData.getByTokenKey(
    mint.toPublicKey()
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
    mint.toPublicKey(),
    owner.toPublicKey(),
    publisher.toPublicKey(),
    [
      owner.toKeypair()
    ],
  );


  // transfer nft publish => receipt
  const inst3 = await SplToken.transferNft(
    mint.toPublicKey(),
    publisher.toPublicKey(),
    receipt.toPublicKey(),
    [
      publisher.toKeypair(),
    ],
    owner.toKeypair() // feePayer
  );

  // submit batch instructions
  (await [inst2, inst3].submit()).match(
    (value) => console.log('# Transfer nft sig: ', value.toExplorerUrl()),
    (error) => assert(error)
  );
})();
