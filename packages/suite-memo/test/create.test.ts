import test from 'ava';
import { Setup } from 'test-tools/setup';
import { requestSol } from 'test-tools';
import { Memo } from '../src';
import { Node } from '~/node';
import { Pubkey } from '~/types/account';
import { KeypairAccount } from '~/types/account';
import { Account } from '~/account';
import { SolNative } from '~/suite-sol-native';
import { SplToken } from '~/suite-spl-token';

let source: KeypairAccount;
let dest: KeypairAccount;
let feePayer: KeypairAccount;
let datetime: Date;

const DUMMY_DATA = 'dummy memo data';
const MEMO_STOCK = new Account.Keypair({
  pubkey: 'Ebq72X3i8ug6AX2G3v2ZoLA4ZcxHurvMuJYorqJ6sALD',
  secret:
    '5f8pvPDETk4tGMN3takiXkty17UBba9xPr3coXEzUi6431UP9hrjDPmi7qhFJz49saKNUaDuWYk51xD924xSrDiD',
});

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
  feePayer = obj.feePayer;
  await requestSol(source.pubkey, 0.02);
});

test.beforeEach(function () {
  datetime = new Date();
});

test('encode', (t) => {
  const res = Memo.encode(DUMMY_DATA);
  t.log('# encoded:', res);
  t.is(res.length, 15);
});

test('create instruction', (t) => {
  const res = Memo.create(DUMMY_DATA, source.secret);
  t.log('# create:', res);
  t.is(typeof res, 'object');
});

test('send memo by owner with fee payer', async (t) => {
  const inst = Memo.create(
    `{"memo": "send memo by owner", "datetime": ${datetime}}`,
    MEMO_STOCK.secret,
    { feePayer: feePayer.secret },
  );

  const res = await inst.submit();
  t.true(res.isOk, res.unwrap());
  t.log('# tx signature: ', res.unwrap());
});

test('send memo and sol transfer by owner', async (t) => {
  const inst1 = Memo.create(
    `send memo and sol transfer: ${datetime}`,
    MEMO_STOCK.secret,
    { feePayer: feePayer.secret },
  );

  await inst1.submit();

  const inst2 = SolNative.transfer(
    source.pubkey,
    dest.pubkey,
    [source.secret],
    0.01, // Too low lamports, but  error occurs
  );

  const res = await inst2.submit();
  t.true(res.isOk);
  t.log('# tx signature: ', res.unwrap());
});

test('send memo and spl-token transfer by owner', async (t) => {
  const inst = await SplToken.mint(
    source.secret,
    10000,
    4,
    {
      name: 'Memo spl-token',
      symbol: 'MST',
      uri: 'https://ipfs.io/ipfs/bafkreidm6xq7rognuapkmqweeco6vfo2hsgf7lndqttgxx6nnegc472qgi',
    },
    { feePayer: feePayer.secret },
  );

  const sig = await inst.submit();
  await Node.confirmedSig(sig.unwrap());

  const inst1 = Memo.create(
    `send memo and spl-token transfer: ${datetime}`,
    dest.secret,
    { feePayer: feePayer.secret },
  );

  await inst1.submit();

  const inst2 = await SplToken.transfer(
    inst.unwrap().data as Pubkey,
    source.pubkey,
    dest.pubkey,
    [source.secret],
    7777,
    4,
    { feePayer: feePayer.secret },
  );

  (await inst2.submit()).match(
    (ok) => {
      t.pass();
      t.log('# tx signature: ', ok);
    },
    (err) => t.fail(err.message),
  );
});

test('[Err] Over max limit', async (t) => {
  const overData = 'a'.repeat(2000);
  const inst = Memo.create(overData, source.secret);

  const res = await inst.submit();
  t.true(res.isErr);
});
