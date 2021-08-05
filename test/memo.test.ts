import {describe, it} from 'mocha';
import {expect, assert} from 'chai'
import {Memo} from '../src/memo';
import {Account} from '../src/account';

const DUMMY_DATA = 'dummy memo data';

describe('Memo', () => {
  it('encode', async () => {
    const res = Memo.encode(DUMMY_DATA);
    console.log(`# encoded: ${res}`, res);
    expect(res.length).to.equal(15);
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
    expect(res).to.equal('{"nft": "art", "url": "http://hoge.hoge"}');
  });

  it('send memo by own', async () => {
    const signer = await Account.createAccount();
    console.log(`# signer: `, signer);
    const memoInst = Memo.createInstruction('{"memo": 123456789}');
    const res = await Memo.own(memoInst, signer);
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });
})
