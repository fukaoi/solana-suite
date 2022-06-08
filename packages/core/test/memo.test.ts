import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../../shared/test/testSetup';
import {
  Memo,
  KeypairStr,
  Account,
  SolNative,
  Transaction,
  SplToken
} from '../src';

let source: KeypairStr;
let dest: KeypairStr;
let mint: string;
const DUMMY_DATA = 'dummy memo data';

describe('Memo', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
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

  it('decode', async () => {
    const data = 'U1Gg9T9EGN5tDRw28wR3GxXWZBkoS3rg2U3iMZdViMJhd5pVNsxh79RW';
    const res = Memo.decode(data);
    console.log(`# decode: `, res, data);
    assert.equal(res, '{"nft": "art", "url": "http://hoge.hoge"}');
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
      source.toKeypair(),
    );

    const inst2 = await SolNative.transfer(
      source.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair()],
      0.01  // Too low lamports, but  error occures
    );

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('send memo and spl token transfer', async () => {
    const inst1 = Memo.create(
      `${new Date()}`,
      dest.toPublicKey(),
      source.toKeypair(),
    );

    const inst2 = await SplToken.mint(
      source.toPublicKey(),
      [source.toKeypair()],
      10000,
      0
    );

    mint = inst2.unwrap().data as string;

    const inst3 = await SplToken.transfer(
      mint.toPublicKey(),
      source.toPublicKey(),
      dest.toPublicKey(),
      [
        source.toKeypair()
      ],
      100,
      0
    );

    const res = await [inst1, inst2, inst3].submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('Get memo data in transaction from dest', async () => {
    const res = await Transaction.getHistory(
      dest.toPublicKey(),
    );
    assert.isOk(res.isOk);
    assert.isNotEmpty(res.unwrap()[0].memo)
    res.unwrap().forEach(r => {
      if (r.memo) {
        console.log('# memo in transaction: ', r.memo);
        assert.isNotEmpty(r.memo);
      }
    });
  });

  it('Get memo data in spl transaction from dest', async () => {
    const res = await Transaction.getTokenHistory(
      mint.toPublicKey(),
      dest.toPublicKey(),
    );
    console.log(res);
    assert.isOk(res.isOk);
    assert.isNotEmpty(res.unwrap()[0].memo)
    res.unwrap().forEach(r => {
      if (r.memo) {
        console.log('# memo in transaction: ', r.memo);
        assert.isNotEmpty(r.memo);
      }
    });
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
})
