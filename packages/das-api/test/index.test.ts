import test from 'ava';
import { DasApi } from '../src/';
import { Setup } from 'test-tools/setup';
import { KeypairAccount } from '~/types/account';

let source: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('Get asset proof', async (t) => {
  const assetId = 'E6eXaU51PE9L46VboqWGUeubrhvR2pk3eTP6ZqAP4vhg';
  const res = await DasApi.getAssetProof(assetId);
  res.match(
    (ok) => {
      t.not(ok.leaf, '');
      t.not(ok.root, '');
      t.not(ok.proof, []);
      t.not(ok.tree_id, '');
      t.not(ok.node_index, 0);
    },
    (err) => t.fail(err.message),
  );
});

test('Get asset', async (t) => {
  const assetId = 'E6eXaU51PE9L46VboqWGUeubrhvR2pk3eTP6ZqAP4vhg';
  const res = await DasApi.getAsset(assetId);
  res.match(
    (ok) => {
      t.not(ok.content, '');
      t.not(ok.creators, '');
      t.not(ok.grouping, '');
      t.not(ok.authorities, '');
    },
    (err) => t.fail(err.message),
  );
});

test('Get assets by owner', async (t) => {
  const res = await DasApi.getAssetsByOwner(source.pubkey);
  res.match(
    (ok) => {
      t.log('#total: ', ok.total);
      ok.items.forEach((asset) => {
        t.not(asset.content, '');
        t.not(asset.creators, '');
        t.not(asset.grouping, '');
        t.not(asset.authorities, '');
      });
    },
    (err) => t.fail(err.message),
  );
});
