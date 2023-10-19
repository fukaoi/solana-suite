import { SolNative } from '../src';
import test from 'ava';
import { Setup } from 'test-tools/setup';
import { KeypairAccount } from '~/account';
import { Multisig } from '@solana-suite/multisig';

let source: KeypairAccount;
let dest: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
});

test('transfer transaction with multi sig', async (t) => {
  const signer1 = KeypairAccount.create();
  const signer2 = KeypairAccount.create();
  const inst1 = await Multisig.create(2, source.secret, [
    signer1.pubkey,
    signer2.pubkey,
  ]);

  let multisig!: string;

  (await inst1.submit()).match(
    () => {
      multisig = inst1.unwrap().data as string;
      t.log('# multisig: ', multisig);
    },
    (err) => t.fail(err.message),
  );

  const inst2 = await SolNative.transferWithMultisig(
    multisig,
    dest.pubkey,
    [signer1.secret, signer2.secret],
    0.01,
    source.secret,
  );

  (await inst2.submit()).match(
    (sig: string) => {
      t.log('# signature: ', sig);
      t.pass();
    },
    (err: Error) => t.fail(err.message),
  );
});
