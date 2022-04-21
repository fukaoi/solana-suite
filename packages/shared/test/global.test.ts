import {describe, it} from 'mocha';
import {assert} from 'chai';
import '../src/global';
import {sleep, tryCatch} from '../src/global';

describe('Global', () => {
  it('Convert string to PublicKey', async () => {
    const str = '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U';
    const res = str.toPublicKey();
    assert.equal(res.constructor.name, 'PublicKey');
  });

  it('Create explorer url by address', async () => {
    const str = '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U';
    const res = str.toExplorerUrl();
    assert.isNotEmpty(res);
    console.log(res);
  });

  it('Create explorer url by signature', async () => {
    const str = '47KcZGxPayz3cJ3Vy6mKCFmz6N4kGkKm3TDnb9VVJ4krrgdu3WznRKyweh4n6KfWgXTm2LzdVqf8sPmjV1H2u6YR';
    const res = str.toExplorerUrl();
    assert.isNotEmpty(res);
    console.log(res);
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

  it('console.debug', async () => {
    console.debug(
      'debug test', {title: 'test'}, () => {return }
    );
  });

  it('sleep', async () => {
    const id = setInterval(console.log, 990, 'sleep count');
    await sleep(3);
    assert.isOk(id);
    clearInterval(id);
  });
})
