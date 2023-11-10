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

test('Get asset id', async (t) => {
  const treeOwner = '3ThvFMB15aiKSmSP966183RybmDRXfCiedEJMsUEhfaM';
  const tree = new CompressedNft.Tree(treeOwner);
  const assetId = await tree.getAssetId();
  t.log('# asset id: ', assetId);
  t.true(Account.Keypair.isPubkey(assetId));
});

test('Create merkle tree', async (t) => {
  const inst = await CompressedNft.initTree(source.secret);
  (await inst.submit()).match(
    (ok) => {
      t.log('# sig: ', ok);
      t.log('# treeOwner: ', inst.unwrap().data);
      t.pass();
    },
    (err) => {
      t.fail(err.message);
    },
  );
});
