import test from 'ava';
import { DasApi } from '../src/';
import { Setup } from 'test-tools/setup';
import { KeypairAccount } from '~/types/account';

let source: KeypairAccount;
let collectionMint: Pubkey;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  collectionMint = obj.collectionMint;
});

test('Get asset proof', async (t) => {
  const assetId = 'E6eXaU51PE9L46VboqWGUeubrhvR2pk3eTP6ZqAP4vhg';
  const res = await DasApi.getAssetProof(assetId);
  res.match(
    (ok) => {
      if (ok) {
        t.log(ok.leaf);
        t.log(ok.root);
        t.log(ok.proof);
        t.log(ok.tree_id);
        t.log(ok.node_index);
      }
      t.pass();
    },
    (err) => t.fail(err.message),
  );
});

test('Get asset', async (t) => {
  const assetId = 'E6eXaU51PE9L46VboqWGUeubrhvR2pk3eTP6ZqAP4vhg';
  const res = await DasApi.getAsset(assetId);
  res.match(
    (ok) => {
      if (ok) {
        t.log(ok.content);
        t.log(ok.creators);
        t.log(ok.grouping);
        t.log(ok.authorities);
      }
      t.pass();
    },
    (err) => t.fail(err.message),
  );
});

test('Get assets by owner', async (t) => {
  const res = await DasApi.getAssetsByOwner(source.pubkey);
  res.match(
    (ok) => {
      if (ok) {
        t.log('#total: ', ok.total);
        ok.items.forEach((asset) => {
          t.log(asset.content, '');
          t.log(asset.creators, '');
          t.log(asset.grouping, '');
          t.log(asset.authorities, '');
        });
      }
      t.pass();
    },
    (err) => t.fail(err.message),
  );
});

test('Get assets by group', async (t) => {
  const res = await DasApi.getAssetsByGroup('collection', collectionMint);
  res.match(
    (ok) => {
      if (ok) {
        t.log('#total: ', ok.total);
        ok.items.forEach((asset) => {
          t.log(asset.content, '');
          t.log(asset.creators, '');
          t.log(asset.grouping, '');
          t.log(asset.authorities, '');
        });
      }
      t.pass();
    },
    (err) => t.fail(err.message),
  );
});

test('Get priority fee estimate', async (t) => {
  t.log('# Node env: ', process.env.NODE_ENV);
  const account = ['JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4'];
  const res = await DasApi.getPriorityFeeEstimate(account);
  res.match(
    (ok) => {
      if (ok) {
        console.log(ok);
      }
      t.pass();
    },
    (err) => t.fail(err.message),
  );
});
