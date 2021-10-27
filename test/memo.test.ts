import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';
import {Memo, Wallet, Transaction} from '../src';

let source: Wallet.KeypairStr;
const DUMMY_DATA = 'dummy memo data';

describe('Memo', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

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
    const memoInst = Memo.createInstruction('{"memo": 123456789}');
    const res =
      await Transaction.sendInstruction(
        [source.secret.toKeypair()],
      )({
        txInstructions: [memoInst],
      });

    if (res.isErr) console.error(res.error);
    console.log('# tx signature: ', res.unwrap());
    assert.isNotTrue(res.isErr);
  });
})
