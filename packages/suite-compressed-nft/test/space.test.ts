import test from 'ava';
import { Setup } from 'test-tools/setup';
import { CompressedNft } from '../src';
import { KeypairAccount } from '~/types/account';

let owner: KeypairAccount;
let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  owner = obj.source;
  feePayer = obj.feePayer;
});

test('Create merkle tree', async (t) => {
  const inst = await CompressedNft.initSpace(owner.secret, 3, 8, 3, {
    feePayer: feePayer.secret,
  });
  (await inst.submit()).match(
    (ok) => {
      t.log('# sig: ', ok);
      t.log('# treeOwner: ', inst.unwrap().data);
      t.pass();
    },
    (err) => {
      console.error(err);
      t.fail(err.message);
    },
  );
});

test('Create merkle tree by mint total number', async (t) => {
  const inst = await CompressedNft.createSpace(owner.secret, 8, {
    feePayer: feePayer.secret,
  });
  (await inst.submit()).match(
    (ok) => {
      t.log('# sig: ', ok);
      t.log('# treeOwner: ', inst.unwrap().data);
      t.pass();
    },
    (err) => {
      console.error(err);
      t.fail(err.message);
    },
  );
});

test('Calculate space cost', async (t) => {
  const res = await CompressedNft.calculateSpaceCost(10000);
  t.log('# cost: ', res);
  t.not(res, undefined);
});
