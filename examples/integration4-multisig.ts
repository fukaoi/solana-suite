//////////////////////////////////////////////
// $ npx ts-node examples/integration4-multisig.ts
//////////////////////////////////////////////

import assert from 'assert';
import { Multisig } from '@solana-suite/multisig';
import { Account, Node, Pubkey } from '@solana-suite/utils';
import { Airdrop } from '@solana-suite/airdrop';
import { requestSol } from 'test-tools';

(async () => {
  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // [Type of wallet]
  // owner: stocked sol account, maybe be human wallet app(or hard ware wallet)
  // feePayer: pay transaction fee. maybe 0.0002-0.0005 SOL
  // publisher: mint token, transfer token and pay transaction fee account
  // receipt: generally user account. sol not stocked

  const feePayer = Account.Keypair.create();

  // signer for multisig
  const signer1 = Account.Keypair.create();
  const signer2 = Account.Keypair.create();
  const signer3 = Account.Keypair.create();

  // faucet
  if (process.env.AIR_DROP) {
    await Airdrop.request(feePayer.pubkey);
  } else {
    await requestSol(feePayer.pubkey, 0.6);
  }

  console.log('# feePayer: ', feePayer.pubkey);
  console.log('# signer1: ', signer1.pubkey);
  console.log('# signer2: ', signer2.pubkey);
  console.log('# signer3: ', signer3.pubkey);

  //////////////////////////////////////////////
  // Setting multisig 2 of 2(m of n)
  //////////////////////////////////////////////
  const signerPubkeys = [signer1.pubkey, signer2.pubkey, signer3.pubkey];
  const inst1 = await Multisig.create(2, feePayer.secret, signerPubkeys);
  const multisig = inst1.unwrap().data as Pubkey;
  (await inst1.submit()).match(
    async (value) => {
      console.log('# multisig address: ', multisig);
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error),
  );
})();
