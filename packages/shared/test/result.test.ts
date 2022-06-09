import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Result} from '../src/result';

describe('Result', () => {
  it('if/else condition', () => {
    const res = Result.ok('test');
    if (res.isOk) {
      console.log(res.value);
    } else {
      console.log((res as Result.Err<string, Error>).error);
    }

    if (res.isOk) {
      console.log(res.value);
    } else {
      console.log(res.error);
    }

    class Foo {
      foo = 123;
    }

    class Bar {
      bar = 123;
    }

    function doStuff(arg: Foo | Bar) {
      if (arg instanceof Foo) {
        console.log(arg.foo); // OK
      }
      else {  // MUST BE Bar!
        console.log(arg.bar); // OK
      }
    }

    doStuff(new Foo());
    doStuff(new Bar());
  });
})
