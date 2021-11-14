import {describe, it, before} from 'mocha';
import {SolNative, Memo, Wallet, Multisig} from '../src';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';

let source: Wallet.KeypairStr;
let dest: Wallet.KeypairStr;

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('transfer transaction', async () => {
    const solAmount = 0.0001;
    const inst =
      await SolNative.transfer(
        source.pubkey.toPubKey(),
        dest.pubkey.toPubKey(),
        [source.secret.toKeypair()],
        solAmount,
      );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    const res = await inst.unwrap().submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# tx signature: ', res.unwrap().sig.toSigUrl());
  });

  it('transfer transaction with memo data', async () => {
    const solAmount = 0.0001;
    const inst1 = Memo.create(
      '{"tokenId": "dummy", "serialNo": "15/100"}',
      [source.secret.toKeypair()]
    );

    const inst2 = await SolNative.transfer(
      source.pubkey.toPubKey(),
      dest.pubkey.toPubKey(),
      [source.secret.toKeypair()],
      solAmount,
    );


    const res = await [inst1, inst2.unwrap()].submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# tx signature: ', res.unwrap().sig.toSigUrl());
  });

  it('transfer transaction with fee payer', async () => {
    const solAmount = 0.0001;
    const owner = Wallet.create();
    const feePayer = source;
    const before = (await Wallet.getBalance(feePayer.pubkey.toPubKey())).unwrap();
    const inst = await SolNative.transfer(
      owner.pubkey.toPubKey(),
      dest.pubkey.toPubKey(),
      [
        owner.secret.toKeypair(),
      ],
      solAmount,
      feePayer.secret.toKeypair()
    );

    const res = await inst.unwrap().submit(); 
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# tx signature: ', res.unwrap().sig.toSigUrl());
    const after = (await Wallet.getBalance(feePayer.pubkey.toPubKey())).unwrap();
    assert.isTrue(before > after, `before fee: ${before}, after fee: ${after}`);
  });

  it('Use internal multisigTransfer()', async () => {
    const amount = 0.0001;
    const inst = await SolNative.multisigTransfer(
      source.pubkey.toPubKey(),
      dest.pubkey.toPubKey(),
      [
        source.secret.toKeypair(),
      ],
      amount,
    );
    const res = await inst.unwrap().submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# signature :', res.unwrap().sig.toSigUrl());
  });

  it('transfer transaction with multi sig', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const inst1 = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
      ]
    );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);

    const amount = 0.0001;
    const multisig = (inst1.unwrap().value as string);

    const inst2 = await SolNative.multisigTransfer(
      multisig.toPubKey(),
      dest.pubkey.toPubKey(),
      [
        source.secret.toKeypair(),
        signer1.secret.toKeypair(),
        signer2.secret.toKeypair(),
      ],
      amount,
      source.secret.toKeypair(),
    );
    assert.isTrue(inst2.isOk, `${inst2.unwrap()}`);

    const res = await [inst1.unwrap(), inst2.unwrap()].submit();
    assert.isTrue(res.isOk, res.unwrap().toString());
    console.log('# signature: ', res.unwrap().sig.toSigUrl());
  });
})
