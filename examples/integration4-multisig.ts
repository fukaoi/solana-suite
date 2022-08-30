//////////////////////////////////////////////
// $ npx ts-node examples/integration4-multisig.ts
//////////////////////////////////////////////

import assert from 'assert';
import {
  KeypairStr,
  Multisig,
  SolNative,
  SplToken,
  Pubkey,
  Airdrop,
} from '@solana-suite/core';

import {Node} from '@solana-suite/shared';

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // [Type of wallet]
  // owner: stocked sol account, maybe be human wallet app(or hard ware wallet)
  // feePayer: pay transaction fee. maybe 0.0002-0.0005 SOL
  // publisher: mint token, transfer token and pay transaction fee account
  // receipt: generally user account. sol not stocked

  const owner = KeypairStr.create();
  const feePayer = KeypairStr.create();
  const receipt = KeypairStr.create();

  // signer for multisig
  const signer1 = KeypairStr.create();
  const signer2 = KeypairStr.create();
  const signer3 = KeypairStr.create();

  // faucet 1 sol
  await Airdrop.request(owner.toPublicKey());

  console.log('# owner: ', owner.pubkey);
  console.log('# feePayer: ', receipt.pubkey);
  console.log('# receipt: ', receipt.pubkey);
  console.log('# signer1: ', signer1.pubkey);
  console.log('# signer2: ', signer2.pubkey);
  console.log('# signer3: ', signer3.pubkey);

  //////////////////////////////////////////////
  // Setting multisig 2 of 2(m of n)
  //////////////////////////////////////////////
  const signerPubkey = [
    signer1.toPublicKey(),
    signer2.toPublicKey(),
    signer3.toPublicKey(),
  ];

  const inst1 = await Multisig.create(
    2,
    owner.toKeypair(),
    signerPubkey
  );

  //////////////////////////////////////////////
  // TRANSFER FROM OWNER TO PUBLISHER
  //////////////////////////////////////////////
  const inst2 = await SolNative.transfer(
    owner.toPublicKey(),        // from
    feePayer.toPublicKey(),     // to
    [owner.toKeypair()],     // signing
    0.5,                     // 0.5 SOL
  );

  const publisher = inst1.unwrap().data as Pubkey;
  console.log('# multisig address: ', publisher);

  // submit batch instructions
  await (await [inst1, inst2].submit()).match(
    async (value) => {
      // [optional]if need this action. wait confirmation state
      await Node.confirmedSig(value);
    },
    error => assert.fail(error)
  );

  //////////////////////////////////////////////
  // CREATE SPL TOKEN
  //////////////////////////////////////////////

  const multiSigners = [
    signer1.toKeypair(),
    signer2.toKeypair(),
  ];

  // created by publisher account
  const inst3 =
    await SplToken.mint(
      publisher.toPublicKey(),  // creator account
      multiSigners,          // signing
      100000,                // Total number of tokens issued
      2,                     // token's decimal e.g:0.12, 20.52
      feePayer.toKeypair()   // pay transaction fee
    );

  const mint = (inst3.unwrap().data as Pubkey);
  console.log('# mint: ', mint);

  const inst4 = await SplToken.transfer(
    mint.toPublicKey(),       // tokenKey
    publisher.toPublicKey(),  // from. own token
    receipt.toPublicKey(),    // to
    multiSigners,             // sinning
    5000,                     // transfer amount
    2,                        // token's decimal e.g:0.12, 20.52
    feePayer.toKeypair()      // pay transaction fee
  );

  // submit batch instructions
  await (await [inst3, inst4].submit()).match(
    value => console.log('# sig url: ', value.toExplorerUrl()),
    error => assert.fail(error.message)
  );
})();
