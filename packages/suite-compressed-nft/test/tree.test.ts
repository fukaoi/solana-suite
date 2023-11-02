import test from 'ava';
import { Setup } from 'test-tools/setup';
import { CompressedNft } from '../src';
import { Account } from '~/account';
import { KeypairAccount } from '~/types/account';

let source: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('Create merkle tree', async (t) => {
  const treeOwner = Account.Keypair.create();
  const inst = await CompressedNft.initTree(treeOwner.secret, source.secret);
  (await inst.submit()).match(
    (ok) => {
      t.log('# sig: ', ok);
      t.pass();
    },
    (err) => {
      t.fail(err.message);
    },
  );
});
