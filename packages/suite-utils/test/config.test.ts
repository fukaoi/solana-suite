import test from 'ava';
import { Config, Constants } from '../src/';

test('Load config', (t) => {
  t.log(Constants.loadConfig());
  t.pass();
});

test('Update config data', (t) => {
  t.log(Constants.loadConfig());
  t.pass();
});
