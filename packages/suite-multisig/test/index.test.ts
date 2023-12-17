import test from 'ava';
import { Multisig } from '../src/';
import { Setup } from 'test-tools/setup';
import { Account } from '~//account';
import { KeypairAccount } from '~/types/account';
import { Pubkey } from '~/types/account';

let source: KeypairAccount;
let dest: KeypairAccount;
let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
  feePayer = obj.feePayer;
});

test('Is multisig address', async (t) => {
  const signer1 = Account.Keypair.create();
  const signer2 = Account.Keypair.create();
  const inst = await Multisig.create(2, feePayer.secret, [
    signer1.pubkey,
    signer2.pubkey,
  ]);

  t.true(inst.isOk, `${inst.unwrap()}`);
  const res = await inst.submit();
  t.true(res.isOk, `${res.unwrap()}`);
  const address = inst.unwrap().data as string;
  console.log('# multisig address: ', address);
  const isAddress = await Multisig.isAddress(address);
  t.true(isAddress.isOk);
  t.true(isAddress.unwrap());
});

test('[Err]Invalid multisig address', async (t) => {
  const signer1 = Account.Keypair.create();
  const signer2 = Account.Keypair.create();
  const inst = await Multisig.create(2, source.secret, [
    signer1.pubkey,
    signer2.pubkey,
  ]);

  const address = inst.unwrap().data as string;
  const res = await Multisig.isAddress(address);
  t.log(res);
  t.false(res.isErr);
  t.false(res.unwrap());
});

test('Create account 2 of 3', async (t) => {
  const signer1 = Account.Keypair.create();
  const signer2 = Account.Keypair.create();
  const signer3 = Account.Keypair.create();
  const inst = await Multisig.create(2, feePayer.secret, [
    signer1.pubkey,
    signer2.pubkey,
    signer3.pubkey,
  ]);

  t.true(inst.isOk, `${inst.unwrap()}`);
  const res = await inst.submit();
  t.true(res.isOk, `${res.unwrap()}`);
  console.log('# multisig account: ', inst.unwrap().data);
});

test('[Err] m number less than signers number', async (t) => {
  const signer1 = Account.Keypair.create();
  const res = await Multisig.create(2, source.secret, [signer1.pubkey]);
  t.true(res.isErr);
});

test('Get multisig info', async (t) => {
  const signer1 = Account.Keypair.create();
  const signer2 = Account.Keypair.create();
  const inst = await Multisig.create(2, feePayer.secret, [
    signer1.pubkey,
    signer2.pubkey,
  ]);
  t.true(inst.isOk, `${inst.unwrap()}`);
  await inst.submit();
  const res = await Multisig.getInfo(inst.unwrap().data as Pubkey);
  t.is(res.unwrap().signer1.toString(), signer1.pubkey);
  t.is(res.unwrap().signer2.toString(), signer2.pubkey);
  t.true(res.isOk, `${res.unwrap()}`);
});
