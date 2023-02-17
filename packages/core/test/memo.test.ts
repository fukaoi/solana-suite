import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../shared/test/testSetup';
import { Memo, SolNative } from '../src';
import { KeyPair } from '../../shared/src/key-pair';

let source: KeyPair;
let dest: KeyPair;
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
    const res = Memo.create(DUMMY_DATA, source.pubkey, source.secret);
    console.log(`# create: `, res);
    assert.isObject(res);
  });

  it('send memo by own', async () => {
    const inst = Memo.create(
      '{"memo": "send memo by own"}',
      source.pubkey,
      source.secret
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('send memo and sol transfer by owner', async () => {
    const inst1 = Memo.create(
      `send memo and sol transfer: ${new Date()}`,
      dest.pubkey,
      source.secret
    );

    const inst2 = SolNative.transfer(
      source.pubkey,
      dest.pubkey,
      [source.secret],
      0.01 // Too low lamports, but  error occurs
    );

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('[Err] Over max limit', async () => {
    const overData = 'a'.repeat(2000);
    const inst = Memo.create(overData, source.pubkey, source.secret);

    const res = await inst.submit();
    assert.isTrue(res.isErr);
  });
});
