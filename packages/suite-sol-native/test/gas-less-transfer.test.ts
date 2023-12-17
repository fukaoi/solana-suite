import test from 'ava';
import { Setup } from 'test-tools/setup';
import { requestSol } from 'test-tools';
import { KeypairAccount } from '~/types/account';
import { SolNative } from '../src/';

let source: KeypairAccount;
let dest: KeypairAccount;
let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
  feePayer = obj.feePayer;
  await requestSol(source.pubkey, 0.02);
});

test('transfer feePayerPartialSign', async (t) => {
  const solAmount = 0.01;
  const serialized = await SolNative.gasLessTransfer(
    source.pubkey,
    dest.pubkey,
    [source.secret],
    solAmount,
    feePayer.pubkey,
  );

  (await serialized.submit(feePayer.secret)).match(
    (ok) => {
      t.log('# tx signature: ', ok);
      t.pass();
    },
    (err) => {
      console.error(err);
      t.fail(err.message);
    },
  );
});
