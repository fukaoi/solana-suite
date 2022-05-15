import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Result, Constants} from '../src';
import {Memo} from '../../core/src/';
import {Setup, KeypairStr} from './testSetup';
import {
  TransactionInstruction,
} from '@solana/web3.js';


let source: KeypairStr;

describe('Instruction', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Submit batch instructions', async () => {
    const inst1 =
      Memo.create(
        '{"title": "Submit first instruction"}',
        source.toPublicKey(),
        source.toKeypair(),
      );

    const inst2 =
      Memo.create(
        '{"title": "Submit first instruction"}',
        source.toPublicKey(),
        source.toKeypair(),
      );

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('Submit instructions, Result type', async () => {
    const inst =
      Result.ok(Memo.create(
        '{"title": "Submit first instruction"}',
        source.toPublicKey(),
        source.toKeypair(),
      ));

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('Submit batch instructions, Result type', async () => {
    const inst1 =
      Result.ok(Memo.create(
        '{"title": "Submit first instruction"}',
        source.toPublicKey(),
        source.toKeypair(),
      ));

    const inst2 =
      Result.ok(Memo.create(
        '{"title": "Submit second instruction"}',
        source.toPublicKey(),
        source.toKeypair(),
      ));

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('Submit batch many instructions', async () => {
    const insts = [];
    for (let i = 0; i < 20; i++) {
      insts.push(Memo.create(
        `{"title": "Submit ${i} instruction"}`,
        source.toPublicKey(),
        source.toKeypair(),
      ));
    }
    const res = await insts.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('[Err]Submit instructions, Result type', async () => {
    const message = 'Raise error';
    const inst = Result.err(Error(message));

    const res = await inst.submit();
    assert.isTrue(res.isErr);
    if (res.isErr) {
      assert.equal(res.error.message, message);
    } else {
      assert.fail('Not found Error object');
    }
  });

  it.only('[Err]Submit batch instructions, Include Error in Result type', async () => {
    const message = 'Raise error, seconde instructure';
    const inst1 = new TransactionInstruction({
      programId: Constants.MEMO_PROGRAM_ID,
      data: Buffer.from('data'),
      keys: []
    });

    const inst2 = Result.err(Error(message));

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isErr);
    console.log(res.isErr && res.error.message);
  });

  it('[Err]Use invalid array when Submit batch instructions', async () => {
    const res = await ['invalid type'].submit();
    assert.isTrue(res.isErr);
  });
})
