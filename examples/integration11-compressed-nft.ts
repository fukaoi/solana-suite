//////////////////////////////////////////////
// $ npx ts-node examples/integration11-compressed-nft.ts
//////////////////////////////////////////////

import assert from 'assert';
import {
  Account,
  CompressedNft,
  Explorer,
  Node,
  sleep,
} from '@solana-suite/compressed-nft';
import { RandomAsset } from 'test-tools/setupAsset';
import { requestSol } from 'test-tools';

(async () => {
  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // create nft owner wallet.
  const owner = Account.Keypair.create();
  const nftReceiver = Account.Keypair.create();
  const receipt = Account.Keypair.create();
  const feePayer = Account.Keypair.create();

  console.log('# owner: ', owner.pubkey);
  console.log('# nftReceiver: ', nftReceiver.pubkey);
  console.log('# receipt: ', receipt.pubkey);
  console.log('# feePayer: ', feePayer.pubkey);

  //////////////////////////////////////////////
  // CREATE NFT SPACE, ONCE CALL
  //////////////////////////////////////////////

  const abountMintTotal = 8; // abount mint total number

  const cost = await CompressedNft.calculateSpaceCost(abountMintTotal); // [optional]calculate space cost

  console.log('# space cost: ', cost);

  await requestSol(feePayer.pubkey, cost.sol + 0.1); // need add sol for insufficient fee
  await sleep(2);

  const spaceInst = await CompressedNft.createMintSpace(
    owner.pubkey,
    owner.secret,
    abountMintTotal,
    { feePayer: feePayer.secret },
  );

  (await spaceInst.submit()).match(
    async (value) => {
      await Node.confirmedSig(value);
    },
    (error) => {
      console.error(error);
      assert.fail(error.message);
    },
  );

  const treeOwner = spaceInst.unwrap().data;
  console.log('# treeOwner: ', treeOwner);

  //////////////////////////////////////////////
  // CREATE COLLECTION NFT
  //////////////////////////////////////////////
  const asset = RandomAsset.get();
  console.log('# demo data: ', asset);

  const collectionInst = await CompressedNft.mintCollection(
    owner.pubkey,
    owner.secret,
    {
      filePath: asset.filePath!,
      name: 'NFTCollection',
      symbol: 'Ingr11',
      royalty: 0,
      storageType: 'nftStorage',
      isMutable: true,
    },
    {
      feePayer: feePayer.secret,
    },
  );

  (await collectionInst.submit()).match(
    async (value) => {
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error.message),
  );

  const mintCollection = collectionInst.unwrap().data;
  console.log('# mintCollection: ', mintCollection);

  //////////////////////////////////////////////
  // CREATE NFT, MINT NFT FROM THIS LINE
  //////////////////////////////////////////////

  // Only test that call this function
  // Usually set custom param

  const mintInst = await CompressedNft.mint(
    owner.pubkey,
    owner.secret,
    {
      filePath: asset.filePath!,
      name: asset.name!,
      symbol: 'SAMPLE',
      royalty: 20,
      storageType: 'nftStorage',
      isMutable: true,
      external_url: 'https://external_url',
    },
    treeOwner,
    mintCollection,
    {
      feePayer: feePayer.secret,
      delegate: feePayer.pubkey,
      receiver: nftReceiver.pubkey,
    },
  );

  // this is NFT ID
  (await mintInst.submit()).match(
    async (value) => {
      await Node.confirmedSig(value, 'finalized');
      console.log('# sig: ', value.toExplorerUrl(Explorer.Xray));
    },
    (error) => assert.fail(error),
  );

  const mint = await mintInst.unwrap().data.getAssetId();
  console.log('# mint: ', mint);

  // //////////////////////////////////////////////
  // // TRANSFER RECEIPTS USER FROM THIS LINE
  // //////////////////////////////////////////////

  //transfer nftReceiver => receipt
  const transferInst = await CompressedNft.gasLessTransfer(
    mint,
    nftReceiver.pubkey,
    nftReceiver.secret,
    receipt.pubkey,
    feePayer.pubkey,
  );

  // submit instructions
  (await transferInst.submit(feePayer.secret)).match(
    (value) => console.log('# sig: ', value),
    (error) => assert.fail(error),
  );
})();
