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
import { requestTransferByKeypair } from './requestTransferByKeypair';

(async () => {
  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // create nft owner wallet.
  // const owner = Account.Keypair.create();
  // const owner = new Account.Keypair({
  //   secret:
  //     '2AL4RyRzUuju4KqzFssnhqBBv8hxGMWAxVK7sybPpTiYvsc71wg5xtXmjJcGfuRTuxiqraB9hBYQbZuXMsg8q6js',
  // });
  const nftReceiver = Account.Keypair.create();
  const receipt = Account.Keypair.create();
  const owner = new Account.Keypair({
    secret:
      'si6XUcRuJD9zGSvinDdJZUntW2y3DcUYu2JiQxCQ7gEbeDiJmxwEPzfKN5cGgyfVyHRo5hNgyiULNSxX4sbtbj4',
  });
  // const feePayer = Account.Keypair.create();

  console.log('# owner: ', owner.pubkey);
  console.log('# nftReceiver: ', nftReceiver.pubkey);
  console.log('# receipt: ', receipt.pubkey);
  // console.log('# feePayer: ', feePayer.pubkey);

  //////////////////////////////////////////////
  // CREATE NFT SPACE, ONCE CALL
  //////////////////////////////////////////////

  const abountMintTotal = 8; // abount mint total number

  const cost = await CompressedNft.calculateSpaceCost(abountMintTotal); // [optional]calculate space cost

  console.log('# space cost: ', cost);

  // await requestTransferByKeypair(feePayer.pubkey, cost.sol + 0.5); // need add sol for insufficient fee
  // await requestTransferByKeypair(owner.pubkey, cost.sol + 0.3); // need add sol for insufficient fee
  // await sleep(3);

  const space = await CompressedNft.createMintSpace(
    abountMintTotal,
    // feePayer.secret,
    owner.secret,
  );

  (await space.submit()).match(
    async (value) => {
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error.message),
  );

  const treeOwner = space.unwrap().data;
  console.log('# treeOwner: ', treeOwner);

  //////////////////////////////////////////////
  // CREATE COLLECTION NFT
  //////////////////////////////////////////////
  const asset = RandomAsset.get();
  console.log('# demo data: ', asset);

  const collection = await CompressedNft.mintCollection(
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
    // {
    //   feePayer: feePayer.secret,
    // },
  );

  (await collection.submit()).match(
    async (value) => {
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error.message),
  );

  const mintCollection = collection.unwrap().data;
  console.log('# mintCollection: ', mintCollection);

  //////////////////////////////////////////////
  // CREATE NFT, MINT NFT FROM THIS LINE
  //////////////////////////////////////////////

  // Only test that call this function
  // Usually set custom param

  const inst1 = await CompressedNft.mint(
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
    // {
    //   feePayer: feePayer.secret,
    //   delegate: feePayer.pubkey,
    //   receiver: nftReceiver.pubkey,
    // },
  );

  // this is NFT ID
  (await inst1.submit()).match(
    async (value) => {
      await Node.confirmedSig(value, 'finalized');
      console.log('# sig: ', value.toExplorerUrl(Explorer.Xray));
    },
    (error) => assert.fail(error),
  );

  const mint = inst1.unwrap().data;
  console.log('# mint: ', await mint.getAssetId());

  // //////////////////////////////////////////////
  // // TRANSFER RECEIPTS USER FROM THIS LINE
  // //////////////////////////////////////////////
  //
  // //transfer nft owner => receipt
  // const inst2 = await CompressedNft.transfer(
  //   mint,
  //   owner.pubkey,
  //   receipt.pubkey,
  //   [owner.secret],
  //   { feePayer: feePayer.secret },
  // );
  //
  // // submit instructions
  // (await inst2.submit()).match(
  //   (value) => console.log('# sig: ', value),
  //   (error) => assert.fail(error),
  // );
})();
