import test from 'ava';
import { SolNative } from '../src';
import { Setup } from 'test-tools/setup';
import { Account } from '~/account';
import { KeypairAccount } from '~/types/account';
import { Multisig } from '~/suite-multisig';

let source: KeypairAccount;
let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  feePayer = obj.feePayer;
});

test('transfer transaction with multi sig', async (t) => {
  const signer1 = Account.Keypair.create();
  const signer2 = Account.Keypair.create();
  const inst1 = await Multisig.create(2, feePayer.secret, [
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
    source.pubkey,
    [signer1.secret, signer2.secret],
    0.01,
    { feePayer: feePayer.secret },
  );

  (await inst2.submit()).match(
    (sig: string) => {
      t.log('# signature: ', sig);
      t.pass();
    },
    // (err: Error) => t.fail(err.message),
    (err: Error) => {
      console.error(err);
      t.fail();
    },
  );
});
