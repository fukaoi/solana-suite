//////////////////////////////////////////////
// $ npx ts-node examples/integration10-sbt-mint.ts
//////////////////////////////////////////////

import assert from 'assert';
import { Airdrop } from '@solana-suite/core';
import { Metaplex } from '@solana-suite/nft';
import { KeypairAccount, Node, Pubkey } from '@solana-suite/shared';
import { RandomAsset } from '../packages/storage/test/randomAsset';
import { requestTransferByKeypair } from './requestTransferByKeypair';

(async () => {
  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // create nft owner wallet.
  const owner = KeypairAccount.create();
  const freeze = KeypairAccount.create();
  const feePayer = KeypairAccount.create();

  // faucet
  if (process.env.AIR_DROP) {
    await Airdrop.request(feePayer.pubkey);
  } else {
    await requestTransferByKeypair(feePayer.pubkey);
  }

  console.log('# owner: ', owner.pubkey);
  console.log('# freeze: ', freeze.pubkey);
  console.log('# feePayer: ', feePayer.pubkey);

  // Only test that call this function
  // Usually set custom param
  const asset = RandomAsset.get();
  console.log('# demo data: ', asset);

  //////////////////////////////////////////////
  // CREATE NFT, MINT NFT FROM THIS LINE
  //////////////////////////////////////////////

  const inst1 = await Metaplex.mint(
    owner.pubkey,
    owner.secret,
    {
      filePath: asset.filePath!,
      name: 'First Soul Bound Token',
      symbol: 'SBT',
      royalty: 0,
      storageType: 'nftStorage',
    },
    feePayer.secret,
    freeze.pubkey // Pubkey !!
  );

  // todo: ??? need?
  (await inst1.submit()).match(
    async (value) => await Node.confirmedSig(value, 'finalized'),
    (error) => assert.fail(error)
  );

  // this is NFT ID
  const mint = inst1.unwrap().data as Pubkey;
  console.log('# mint: ', mint);

  //////////////////////////////////////////////
  // CHANGE STATE TO SBT
  //////////////////////////////////////////////

  const inst2 = Metaplex.freeze(
    mint,
    owner.pubkey,
    freeze.secret,
    feePayer.secret
  );

  (await inst2.submit()).match(
    async (value) => await Node.confirmedSig(value, 'finalized'),
    (error) => assert.fail(error)
  );
})();