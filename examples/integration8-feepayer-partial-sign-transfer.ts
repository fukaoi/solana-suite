//////////////////////////////////////////////
// $ npx ts-node examples/integration8-feepayer-partial-sign-transfer
//////////////////////////////////////////////

import assert from 'assert';
import {
  Account,
  SolNative,
} from '@solana-suite/core';

import {
  PartialSignInstruction,
  sleep
} from '@solana-suite/shared';

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET 
  //////////////////////////////////////////////

  // random create
  const owner = Account.create();
  const dest = Account.create();
  const feePayer = Account.create();

  await Account.requestAirdrop(owner.toPublicKey());
  console.log('# owner: ', owner.pubkey);

  await sleep(10); // Avoid 429 error

  await Account.requestAirdrop(feePayer.toPublicKey());
  console.log('# owner: ', feePayer.pubkey);

  //////////////////////////////////////////////
  // CREATE HEX INSTRUCTION(Client side)
  //////////////////////////////////////////////

  const inst = await SolNative.feePayerPartialSignTransfer(
    owner.toPublicKey(),
    dest.toPublicKey(),
    [owner.toKeypair()],
    1,
    feePayer.toPublicKey()
  );

  let hex: string = '';
  inst.match(
    (ok) => {
      hex = ok.hexInstruction;
      console.log('# hex instruction: ', hex);
    },
    (err) => assert(err.message)
  );


  // =============================================== //
  // == SEND HEX VALUE(Client side => Sever side) == //
  // =============================================== //
  
  
  //////////////////////////////////////////////
  // SIGN FEE PAYER AND SUBMIT (Server side)
  //////////////////////////////////////////////

  const obj = new PartialSignInstruction(hex);
  const res = await obj.submit(feePayer.toKeypair());
  res.match(
    (ok) => console.log('# tx signature: ', ok),
    (err) => assert(err.message)
  );
})();
