//////////////////////////////////////////////
// $ npx ts-node examples/integration8-feepayer-partial-sign-transfer
//////////////////////////////////////////////

import assert from 'assert';
import { Airdrop, SolNative, SplToken } from '@solana-suite/core';

import {
  KeypairAccount,
  PartialSignInstruction,
  Pubkey,
} from '@solana-suite/shared';
import { requestTransferByKeypair } from './requestTransferByKeypair';
import { RandomAsset } from '@solana-suite/storage/test/randomAsset';

(async () => {
  // random create
  const owner = KeypairAccount.create();
  const tokenOwner = KeypairAccount.create();
  const dest = KeypairAccount.create();
  const feePayer = KeypairAccount.create();

  // faucet
  if (process.env.AIR_DROP) {
    await Airdrop.request(owner.pubkey);
    await Airdrop.request(feePayer.pubkey);
  } else {
    await requestTransferByKeypair(owner.pubkey);
    await requestTransferByKeypair(feePayer.pubkey);
  }

  console.log('# owner: ', owner.pubkey);
  console.log('# feePayer: ', feePayer);
  console.log('# tokenOwner: ', tokenOwner);
  console.log('# dest: ', dest);

  // SOL version //
  //////////////////////////////////////////////
  // CREATE HEX INSTRUCTION(Client side)
  //////////////////////////////////////////////

  const inst = await SolNative.feePayerPartialSignTransfer(
    owner.pubkey,
    dest.pubkey,
    [owner.secret],
    0.001,
    feePayer.pubkey
  );

  let hex: string = '';
  inst.match(
    (ok) => {
      hex = ok.hexInstruction;
      console.log('# hex instruction: ', hex);
    },
    (err) => assert.fail(err.message)
  );

  // =============================================== //
  // == SEND HEX VALUE(Client side => Sever side) == //
  // =============================================== //

  //////////////////////////////////////////////
  // SIGN FEE PAYER AND SUBMIT (Server side)
  //////////////////////////////////////////////

  const obj = new PartialSignInstruction(hex);
  const res = await obj.submit(feePayer.secret);
  res.match(
    (ok) => console.log('# tx signature: ', ok),
    (err) => assert.fail(err.message)
  );

  // SPL-TOKEN version //
  //////////////////////////////////////////////
  // CREATE HEX INSTRUCTION(Client side)
  //////////////////////////////////////////////
  const decimals = 1;
  const tokenMetadata = {
    name: 'solana-suite-token',
    symbol: 'SST',
    royalty: 50,
    filePath: RandomAsset.get().filePath as string,
    storageType: 'nftStorage',
    isMutable: false,
  };

  const mintInst = await SplToken.mint(
    tokenOwner.pubkey,
    tokenOwner.secret,
    10000,
    decimals,
    tokenMetadata,
    feePayer.secret
  );

  await mintInst.submit();

  const inst2 = await SplToken.feePayerPartialSignTransfer(
    mintInst.unwrap().data as Pubkey,
    tokenOwner.pubkey,
    dest.pubkey,
    [tokenOwner.secret],
    100,
    decimals,
    feePayer.pubkey
  );

  let hex2: string = '';
  inst2.match(
    (ok) => {
      hex2 = ok.hexInstruction;
      console.log('# hex instruction: ', hex2);
    },
    (err) => assert.fail(err.message)
  );

  // =============================================== //
  // == SEND HEX VALUE(Client side => Sever side) == //
  // =============================================== //

  //////////////////////////////////////////////
  // SIGN FEE PAYER AND SUBMIT (Server side)
  //////////////////////////////////////////////

  const obj2 = new PartialSignInstruction(hex2);
  const res2 = await obj2.submit(feePayer.secret);
  res2.match(
    (ok) => console.log('# tx signature: ', ok),
    (err) => assert.fail(err.message)
  );
})();
