import {describe, it, before} from 'mocha';
import {SolNative, Memo, Account, Multisig, KeypairStr} from '../src';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';

let source: KeypairStr;
let dest: KeypairStr;

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
        source.toPubkey(),
        dest.toPubkey(),
        [source.toKeypair()],
        solAmount,
      );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    const res = await inst.unwrap().submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# tx signature: ', res.unwrap().toSigUrl());
  });

  // todo: Fails when run alone. 
  it('transfer transaction with memo data', async () => {
    const solAmount = 0.0001;
    const inst1 = Memo.create(
      '{"tokenId": "dummy", "serialNo": "15/100"}',
      [source.toKeypair()]
    );

    const inst2 = await SolNative.transfer(
      source.toPubkey(),
      dest.toPubkey(),
      [source.toKeypair()],
      solAmount,
      source.toKeypair(),
    );


    const res = await [inst1, inst2.unwrap()].submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# tx signature: ', res.unwrap().toSigUrl());
  });

  it('transfer transaction with fee payer', async () => {
    const solAmount = 0.0001;
    const owner = Account.create();
    const feePayer = source;
    const before = (await Account.getBalance(
      feePayer.pubkey.toPubkey())
    ).unwrap();

    const inst = await SolNative.transfer(
      owner.toPubkey(),
      dest.toPubkey(),
      [
        owner.toKeypair(),
      ],
      solAmount,
      feePayer.toKeypair()
    );

    const res = await inst.unwrap().submit(); 
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# tx signature: ', res.unwrap().toSigUrl());
    const after = (await Account.getBalance(
      feePayer.pubkey.toPubkey())
    ).unwrap();
    assert.isTrue(before > after, `before fee: ${before}, after fee: ${after}`);
  });

  it('Use internal multisigTransfer()', async () => {
    const amount = 0.0001;
    const inst = await SolNative.multisigTransfer(
      source.toPubkey(),
      dest.toPubkey(),
      [
        source.toKeypair(),
      ],
      amount,
    );
    const res = await inst.unwrap().submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# signature :', res.unwrap().toSigUrl());
  });

  it('transfer transaction with multi sig', async () => {
    const signer1 = Account.create();
    const signer2 = Account.create();
    const inst1 = await Multisig.create(
      2,
      source.toKeypair(),
      [
        signer1.toPubkey(),
        signer2.toPubkey(),
      ]
    );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);

    const amount = 0.0001;
    const multisig = (inst1.unwrap().data as string);

    const inst2 = await SolNative.multisigTransfer(
      multisig.toPubkey(),
      dest.toPubkey(),
      [
        source.toKeypair(),
        signer1.toKeypair(),
        signer2.toKeypair(),
      ],
      amount,
      source.toKeypair(),
    );
    assert.isTrue(inst2.isOk, `${inst2.unwrap()}`);

    const res = await [inst1.unwrap(), inst2.unwrap()].submit();
    assert.isTrue(res.isOk, res.unwrap().toString());
    console.log('# signature: ', res.unwrap().toSigUrl());
  });
})
