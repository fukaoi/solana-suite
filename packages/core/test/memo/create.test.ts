import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Memo, SolNative, SplToken } from '../../src';
import { KeypairAccount, Node, Pubkey } from '../../../shared/src/';

let source: KeypairAccount;
let dest: KeypairAccount;
let datetime: Date;

const DUMMY_DATA = 'dummy memo data';
const MEMO_STOCK = new KeypairAccount({
  pubkey: 'Ebq72X3i8ug6AX2G3v2ZoLA4ZcxHurvMuJYorqJ6sALD',
  secret:
    '5f8pvPDETk4tGMN3takiXkty17UBba9xPr3coXEzUi6431UP9hrjDPmi7qhFJz49saKNUaDuWYk51xD924xSrDiD',
});

describe('Memo', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  beforeEach(function () {
    datetime = new Date();
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

  it('send memo by owner with fee payer', async () => {
    const inst = Memo.create(
      `{"memo": "send memo by owner", "datetime": ${datetime}}`,
      MEMO_STOCK.pubkey,
      MEMO_STOCK.secret,
      source.secret
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('send memo and sol transfer by owner', async () => {
    const inst1 = Memo.create(
      `send memo and sol transfer: ${datetime}`,
      MEMO_STOCK.pubkey,
      MEMO_STOCK.secret,
      dest.secret
    );

    const inst2 = SolNative.transfer(
      source.pubkey,
      dest.pubkey,
      [source.secret],
      0.01 // Too low lamports, but  error occurs
    );

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isOk);
    console.log('# tx signature: ', res.unwrap());
  });

  it('send memo and spl-token transfer by owner', async () => {
    const inst = await SplToken.mint(source.pubkey, source.secret, 10000, 4, {
      name: 'Memo spl-token',
      symbol: 'MST',
      uri: 'https://ipfs.io/ipfs/bafkreidm6xq7rognuapkmqweeco6vfo2hsgf7lndqttgxx6nnegc472qgi',
    });

    const sig = await inst.submit();
    await Node.confirmedSig(sig.unwrap());

    const inst1 = Memo.create(
      `send memo and spl-token transfer: ${datetime}`,
      dest.pubkey,
      dest.secret
    );

    const inst2 = await SplToken.transfer(
      inst.unwrap().data as Pubkey,
      source.pubkey,
      dest.pubkey,
      [source.secret],
      7777,
      4
    );

    (await [inst1, inst2].submit()).match(
      (ok) => console.log('# tx signature: ', ok),
      (err) => assert.fail(err.message)
    );
  });

  it('[Err] Over max limit', async () => {
    const overData = 'a'.repeat(2000);
    const inst = Memo.create(overData, source.pubkey, source.secret);

    const res = await inst.submit();
    assert.isTrue(res.isErr);
  });
});
