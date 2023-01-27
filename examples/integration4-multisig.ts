//////////////////////////////////////////////
// $ npx ts-node examples/integration4-multisig.ts
//////////////////////////////////////////////

import assert from 'assert';
import { KeypairStr, Multisig, Pubkey, Airdrop } from '@solana-suite/core';

import { Node } from '@solana-suite/shared';
import { requestTransferByKeypair } from './requestTransferByKeypair';

(async () => {
  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // [Type of wallet]
  // owner: stocked sol account, maybe be human wallet app(or hard ware wallet)
  // feePayer: pay transaction fee. maybe 0.0002-0.0005 SOL
  // publisher: mint token, transfer token and pay transaction fee account
  // receipt: generally user account. sol not stocked

  const feePayer = KeypairStr.create();

  // signer for multisig
  const signer1 = KeypairStr.create();
  const signer2 = KeypairStr.create();
  const signer3 = KeypairStr.create();

  // faucet
  if (process.env.AIR_DROP) {
    await Airdrop.request(feePayer.toPublicKey());
  } else {
    await requestTransferByKeypair(feePayer.toPublicKey(), 0.6);
  }

  console.log('# feePayer: ', feePayer.pubkey);
  console.log('# signer1: ', signer1.pubkey);
  console.log('# signer2: ', signer2.pubkey);
  console.log('# signer3: ', signer3.pubkey);

  //////////////////////////////////////////////
  // Setting multisig 2 of 2(m of n)
  //////////////////////////////////////////////
  const signerPubkeys = [
    signer1.toPublicKey(),
    signer2.toPublicKey(),
    signer3.toPublicKey(),
  ];

  const inst1 = await Multisig.create(2, feePayer.toKeypair(), signerPubkeys);
  const multisig = inst1.unwrap().data as Pubkey;
  (await inst1.submit()).match(
    async (value) => {
      console.log('# multisig address: ', multisig);
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error)
  );
})();
