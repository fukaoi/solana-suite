//////////////////////////////////////////////
//$ npx ts-node exmaples/integration4-multisig.ts
//////////////////////////////////////////////

import assert from 'assert';
import {
  Account, 
  Multisig, 
  SolNative, 
  SplToken,
  Transaction,
} from '../src/index';

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET 
  //////////////////////////////////////////////

  // [Type of wallet]
  // owner: stocked sol account, maybe be human wallet app(or hard ware wallet)
  // feePayer: pay transactionn fee. maybe 0.0002-0.0005 SOL
  // publisher: mint token, transfer token and pay transaction fee account
  // receipt: generally user account. sol not stocked

  const owner = Account.create();
  const feePayer = Account.create();
  const receipt = Account.create();

  // signer for multisig
  const signer1 = Account.create();
  const signer2 = Account.create();
  const signer3 = Account.create();

  // faucet 4 sol
  await Account.requestAirdrop(owner.toPubkey(), 4);

  console.log('# owner: ', owner.pubkey);
  console.log('# feePayer: ', receipt.pubkey);
  console.log('# receipt: ', receipt.pubkey);
  console.log('# signer1: ', signer1.pubkey);
  console.log('# signer2: ', signer2.pubkey);
  console.log('# signer3: ', signer3.pubkey);

  //////////////////////////////////////////////
  // Setting multisig 2 of 2(m of n)
  //////////////////////////////////////////////
  const signerPubkeys = [
    signer1.toPubkey(),
    signer2.toPubkey(),
    signer3.toPubkey(),
  ];

  const inst1 = await Multisig.create(
    2,
    owner.toKeypair(),
    signerPubkeys
  );

  // inst1.unwrap().value or 
  // use inst1.isOk() type guard.inst1.isOk && inst1.value.value 
  const multiRes = await inst1.unwrap().submit();

  multiRes.isErr && assert(multiRes.error.message);

  const publisher = (inst1.unwrap().data as string);
  console.log('# publisher(multisig): ', publisher);


  //////////////////////////////////////////////
  // TRANSFER FROM OWNER TO PUBLISHER
  //////////////////////////////////////////////
  const inst2 = await SolNative.transfer(
    owner.toPubkey(),        // from  
    feePayer.toPubkey(),     // to
    [owner.toKeypair()],     // signing
    3,                       // 3 SOL
  );

  const transferRes = await inst2.unwrap().submit();
  transferRes.isErr && assert(transferRes.error.message);
  console.log('# signature: ', transferRes.unwrap());

  // [optional]if need this action. wait confirmation state
  // await Transaction.confirmedSig(transferRes.unwrap().sig);

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
      publisher.toPubkey(),  // creator account
      multiSigners,          // signning 
      100000,                // Total number of tokens issued
      2,                     // token's decimal e.g:0.12, 20.52
      feePayer.toKeypair()   // pay transaction fee
    );

  const mintRes = await inst3.unwrap().submit();
  mintRes.isErr && assert(mintRes.error.message);

  const tokenKey = (inst3.unwrap().data as string);
  console.log('# tokenKey: ', tokenKey);

  const inst4 = await SplToken.transfer(
    tokenKey.toPubkey(),   // tokenkey
    publisher.toPubkey(),  // from. own token 
    receipt.toPubkey(),    // to 
    multiSigners,          // signning 
    5000,                  // transfer amount
    2,                     // token's decimal e.g:0.12, 20.52
    feePayer.toKeypair()   // pay transaction fee
  );

  const tokenTransferRes = await inst4.unwrap().submit();
  tokenTransferRes.isErr && assert(tokenTransferRes.error.message);

  tokenTransferRes.match(
    (value: string) => console.log('# signature: ', value),
    (error: Error) => console.error(error)
  );
})();
