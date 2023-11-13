import test from 'ava';
import { DasApi } from '../src/';

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
