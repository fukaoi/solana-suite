import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../shared/test/testSetup';
import { Memo, SolNative, KeypairStr } from '../src';

let source: KeypairStr;
let dest: KeypairStr;
const DUMMY_DATA = 'dummy memo data';

describe('Memo', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('encode', async () => {
    const res = Memo.encode(DUMMY_DATA);
    console.log(`# encoded: ${res}`, res);
    assert.equal(res.length, 15);
  });

  it('create instruction', async () => {
    const res = Memo.create(
      DUMMY_DATA,
      source.toPublicKey(),
      source.toKeypair()
    );
    console.log(`# create: `, res);
    assert.isObject(res);
  });

  it('send memo by own', async () => {
    const inst = Memo.create(
      '{"memo": "send memo by own"}',
      source.toPublicKey(),
      source.toKeypair()
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('send memo and sol transfer by owner', async () => {
    const inst1 = Memo.create(
      `send memo and sol transfer: ${new Date()}`,
      dest.toPublicKey(),
      source.toKeypair()
    );

    const inst2 = SolNative.transfer(
      source.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair()],
      0.01 // Too low lamports, but  error occurs
    );

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('[Err] Over max limit', async () => {
    const overData = 'a'.repeat(2000);
    const inst = Memo.create(
      overData,
      source.toPublicKey(),
      source.toKeypair()
    );

    const res = await inst.submit();
    assert.isTrue(res.isErr);
  });
});
