import test from 'ava';
import { Setup } from 'test-tools/setup';
import { KeypairAccount } from '~/account';
import { SolNative } from '../src/';

let source: KeypairAccount;
let dest: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
});

test('transfer feePayerPartialSign', async (t) => {
  const solAmount = 0.01;
  const serialized = await SolNative.feePayerPartialSignTransfer(
    source.pubkey,
    dest.pubkey,
    [source.secret],
    solAmount,
    source.pubkey,
  );

  t.true(serialized.isOk, `${serialized.unwrap()}`);
  if (serialized.isOk) {
    t.log(serialized.value);
    const res = await serialized.value.submit(source.secret);
    t.true(res.isOk, `${res.unwrap()}`);
    t.log('# tx signature: ', res.unwrap());
  }
});
