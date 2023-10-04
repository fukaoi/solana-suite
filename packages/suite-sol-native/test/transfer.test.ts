import { SolNative } from '../src';
import test from 'ava';
import { Setup } from 'test-tools/setup';
import { KeypairAccount } from '~/account';

let source: KeypairAccount;
let dest: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
});

test('transfer transaction', async (t) => {
  const solAmount = 0.01;
  const inst = SolNative.transfer(
    source.pubkey,
    dest.pubkey,
    [source.secret],
    solAmount,
  );

  t.true(inst.isOk, `${inst.unwrap()}`);
  const res = await inst.submit();
  t.true(res.isOk, `${res.unwrap()}`);
  console.log('# tx signature: ', res.unwrap());
});
