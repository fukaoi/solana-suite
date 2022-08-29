import {describe, it} from 'mocha';
import {Result} from '../src/result';

describe('Result', () => {
  it('conditions', () => {
    const res = Result.ok('test');
    // pattern:1
    if (res.isOk) {
      console.log(res.value);
    } else {
      console.log((res as Result.Err<string, Error>).error);
    }

    // pattern:2
    if (res.isOk) {
      console.log(res.value);
    } else if (res.isErr) {
      console.log(res.error);
    }

    // pattern:3
    if (res.isOk) {
      console.log(res.value);
    } else {
      // [tsserver 2339] [E] Property 'error' does not exist on type 'Result<string,Error>' 
      // bug: https://github.com/microsoft/TypeScript/issues/10564
      {/* @ts-ignore */}
      console.log(res.error);
    }

    // pattern:4
    res.match(
      (value) => {
        console.log(value);
      },
      (err) => {
        console.log(err);
      }
    );
  });

  it('match()', () => {
    const res = Result.err(Error('error'));
    res.match(
      (value) => {
        console.log(value);
      },
      (err) => {
        console.log(err.message);
      }
    );
  });
})
