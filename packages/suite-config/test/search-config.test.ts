import test from 'ava';
import { Config } from '../src/search-config';

test('search solana-suite.json', (t) => {
  const configPath = Config.searchForSolanaSuiteConfig('./');
  t.not(configPath, undefined);
});
