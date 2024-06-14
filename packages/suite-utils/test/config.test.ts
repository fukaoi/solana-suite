import test from 'ava';
import { Config, Constants } from '../src/';

test('Load config', (t) => {
  t.log(Constants.loadConfig());
});
