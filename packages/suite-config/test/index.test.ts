import test from 'ava';
import config from '../solana-suite.json';

test('load solana-suite.json', (t) => {
  console.log(config);
  t.true;
});
