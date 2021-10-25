import {describe, it} from 'mocha';
import {assert} from 'chai';
import '../src/global';
import {tryCatch} from '../src/global';

describe('Global', () => {
  it('Convert string to PublicKey', async () => {
    const str = '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U';
    const res = str.toPubKey();
    assert.equal(res.constructor.name, 'PublicKey');
  });

  it('try catch', async () => {
    const message = 'test';
    const res = tryCatch(() => {
      return message;
    });
    if (res.isOk) {
      assert.equal(res.value, message);
    }
  });

  it('try catch. Handling error object', async () => {
    const message = 'test';
    const res = tryCatch(() => {
      throw new Error(message);
    });
    assert.isTrue(res.isErr);
    if (res.isErr) {
      assert.equal(res.error.message, message);
    }
  });

  it('console.debug', async () => {
    console.debug(
      'debug test', {title: 'test'}, () => {return }
    );
  });

  it('console.error', async () => {
    console.error(
      'error test', {title: 'error'}, () => {return}
    );
  });
})
