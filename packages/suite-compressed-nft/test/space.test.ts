import test from 'ava';
import { Setup } from 'test-tools/setup';
import { CompressedNft } from '../src';
import { Account } from '~/account';
import { KeypairAccount } from '~/types/account';

let owner: KeypairAccount;
let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  owner = obj.source;
  feePayer = obj.feePayer;
});

test('Get asset id', async (t) => {
  const spaceOwner = '3ThvFMB15aiKSmSP966183RybmDRXfCiedEJMsUEhfaM';
  const tree = new CompressedNft.Space(spaceOwner);
  const assetId = await tree.getAssetId();
  t.log('# asset id: ', assetId);
  t.true(Account.Keypair.isPubkey(assetId));
});

test('Create merkle tree', async (t) => {
  const inst = await CompressedNft.initSpace(
    owner.pubkey,
    owner.secret,
    3,
    8,
    3,
    { feePayer: feePayer.secret },
  );
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
  const inst = await CompressedNft.createMintSpace(
    owner.pubkey,
    owner.secret,
    8,
    { feePayer: feePayer.secret },
  );
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
