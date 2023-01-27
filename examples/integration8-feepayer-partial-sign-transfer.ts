//////////////////////////////////////////////
// $ npx ts-node examples/integration8-feepayer-partial-sign-transfer
//////////////////////////////////////////////

import assert from 'assert';
import { Airdrop, KeypairStr, SolNative, SplToken } from '@solana-suite/core';

import { PartialSignInstruction, sleep } from '@solana-suite/shared';
import { requestTransferByKeypair } from './requestTransferByKeypair';
import { RandomAsset } from '@solana-suite/storage/test/randomAsset';
import { StorageType } from '@solana-suite/shared-metaplex';

(async () => {
  ////////////////////////////////////////////// CREATE WALLET
  //////////////////////////////////////////////

  // random create
  const owner = KeypairStr.create();
  const tokenOwner = KeypairStr.create();
  const dest = KeypairStr.create();
  const feePayer = KeypairStr.create();

  // faucet
  if (process.env.AIR_DROP) {
    await Airdrop.request(owner.toPublicKey());
    await Airdrop.request(feePayer.toPublicKey());
  } else {
    await requestTransferByKeypair(owner.toPublicKey());
    await requestTransferByKeypair(feePayer.toPublicKey());
  }

  console.log('# owner: ', owner.pubkey);

  await sleep(10); // Avoid 429 error

  await Airdrop.request(feePayer.toPublicKey());
  console.log('# feePayer: ', feePayer.pubkey);

  console.log('# tokenOwner: ', tokenOwner.pubkey);
  console.log('# dest: ', dest.pubkey);

  // SOL version //
  //////////////////////////////////////////////
  // CREATE HEX INSTRUCTION(Client side)
  //////////////////////////////////////////////

  const inst = await SolNative.feePayerPartialSignTransfer(
    owner.toPublicKey(),
    dest.toPublicKey(),
    [owner.toKeypair()],
    0.001,
    feePayer.toPublicKey()
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
  const res = await obj.submit(feePayer.toKeypair());
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
    storageType: 'nftStorage' as StorageType,
    isMutable: false,
  };

  const mintInst = await SplToken.mint(
    tokenOwner.toPublicKey(),
    [tokenOwner.toKeypair()],
    10000,
    decimals,
    tokenMetadata,
    feePayer.toKeypair()
  );

  await mintInst.submit();

  const inst2 = await SplToken.feePayerPartialSignTransfer(
    (mintInst.unwrap().data as string).toPublicKey(),
    tokenOwner.toPublicKey(),
    dest.toPublicKey(),
    [tokenOwner.toKeypair()],
    100,
    decimals,
    feePayer.toPublicKey()
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
  const res2 = await obj2.submit(feePayer.toKeypair());
  res2.match(
    (ok) => console.log('# tx signature: ', ok),
    (err) => assert.fail(err.message)
  );
})();
