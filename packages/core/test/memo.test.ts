import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../../shared/test/testSetup';
import {Memo, KeypairStr, Account, SolNative, Transaction} from '../src';

let source: KeypairStr;
let dest: KeypairStr;
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
      [
        source.toPublicKey(),
      ],
      [
        source.toKeypair()
      ]
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
      [
        source.toPublicKey(),
      ],
      [
        source.toKeypair()
      ]
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('send memo by owners', async () => {
    console.log(source);
    const otherOwner = Account.create();
    const inst = Memo.create(
      '{"memo": "send memo by owners"}',
      [
        otherOwner.toPublicKey()
      ],
      [
        source.toKeypair(),
        otherOwner.toKeypair(),
      ],
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('send memo by owners with fee payer', async () => {
    const owner1 = Account.create();
    const owner2 = Account.create();

    const inst = Memo.create(
      '{"memo": "send memo by owners with fee payer"}',
      [
        owner1.toPublicKey(),
        owner2.toPublicKey(),
      ],
      [
        owner1.toKeypair(),
        owner2.toKeypair(),
      ],
      source.toKeypair()
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('send memo and sol transfer by owner', async () => {
    const owner1 = Account.create();
    const owner2 = Account.create();

    const inst1 = Memo.create(
      '{"memo": "send memo by owners with fee payer"}',
      [
        owner1.toPublicKey(),
        owner2.toPublicKey(),
      ],
      [
        owner1.toKeypair(),
        owner2.toKeypair(),
      ],
      source.toKeypair()
    );

    const inst2 = await SolNative.transfer(
      source.toPublicKey(),
      dest.toPublicKey(),
      [
        source.toKeypair()
      ],
      0.00001
    );

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it.only('Max memo 283 length by i18n', async () => {
    const data500byte = `
    アメリカの地質調査所から気象庁に入った連絡によりますと、
    日本時間の14日午後0時20分ごろ、インドネシア付近のフローレス海を
    震源とするマグニチュード7.6の大きな地震がありました。
    気象庁によりますと、この地震による日本への津波の影響はありません。
    フローレス島など 最大50センチの津波のおそれインドネシアの気象当局は、
    この地震でフローレス島やその周辺のシッカ島、レンバタ島に最大で高さ
    50センチの津波が到達するおそれがあるとして海岸近くの人たちに避難を呼びかけています。
    震源は米国地質調査所国立地震情報センター(USGS,NEIC)による。太平洋津波警報センター.....
    `;

    const inst = Memo.create(
      data500byte,
      [
        source.toPublicKey()
      ],
      [
        source.toKeypair()
      ]
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it.only('Get memo data in transaction', async () => {
    const res = await Transaction.getTransactionHistory(
      source.toPublicKey(),
      [Transaction.Filter.Memo]
    );
    res.isOk && res.value.forEach(console.log);
  });

  it('[Err] Over max limit', async () => {
    const overData = 'a'.repeat(2000);
    const inst = Memo.create(
      overData,
      [
        source.toPublicKey()
      ],
      [
        source.toKeypair()
      ]
    );

    const res = await inst.submit();
    assert.isTrue(res.isErr);
  });
})
