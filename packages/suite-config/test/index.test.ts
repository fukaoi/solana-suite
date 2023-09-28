import test from 'ava';
import config from '../';

test('load solana-suite.json', (t) => {
  t.like(config, {
    cluster: { type: 'localhost-devnet', customClusterUrl: [] },
    debugging: 'false',
    nftstorage: { apikey: '' },
  });
});
