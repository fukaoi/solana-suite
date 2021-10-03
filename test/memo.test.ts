import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Memo} from '../src/memo';
import {Wallet} from '../src/wallet';

const DUMMY_DATA = 'dummy memo data';

describe('Memo', () => {
  it('encode', async () => {
    const res = Memo.encode(DUMMY_DATA);
    console.log(`# encoded: ${res}`, res);
    assert.equal(res.length, 15);
  });

  it('createInstruction', async () => {
    const res = Memo.createInstruction(DUMMY_DATA);
    console.log(`# create: `, res);
    assert.isObject(res);
  });

  it('decode', async () => {
    const data = 'U1Gg9T9EGN5tDRw28wR3GxXWZBkoS3rg2U3iMZdViMJhd5pVNsxh79RW';
    const res = Memo.decode(data);
    console.log(`# decode: `, res, data);
    assert.equal(res, '{"nft": "art", "url": "http://hoge.hoge"}');
  });

  it('send memo by own', async () => {
    const source = await Wallet.create();
    const memoInst = Memo.createInstruction('{"memo": 123456789}');
    const res = await Memo.own(memoInst, source.secret.toKeypair());
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });
})
