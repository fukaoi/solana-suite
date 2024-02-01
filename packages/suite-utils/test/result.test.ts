import test from 'ava';
import { Result } from '../src/';

test('conditions', (t) => {
  const res = Result.ok('test');
  // pattern:1
  if (res.isOk) {
    t.log(res.value);
  } else {
    t.log((res as Result.Err<string, Error>).error);
  }

  // pattern:2
  if (res.isOk) {
    t.log(res.value);
  } else if (res.isErr) {
    t.log(res.error);
  }

  // pattern:3
  if (res.isOk) {
    t.log(res.value);
  } else if (res.isErr) {
    // [tsserver 2339] [E] Property 'error' does not exist on type 'Result<string,Error>'
    // bug: https://github.com/microsoft/TypeScript/issues/10564
    {
      /* @ts-ignore */
    }
    t.log(res.error);
  }

  // pattern:4
  res.match(
    (value) => {
      t.log(value);
    },
    (err) => {
      t.log(err);
    },
  );
  t.pass();
});

test('match()', (t) => {
  const res = Result.err(Error('error'));
  res.match(
    (value) => {
      t.log(value);
    },
    (err) => {
      t.log(err.message);
    },
  );
  t.pass();
});
