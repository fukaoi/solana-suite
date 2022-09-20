import { describe, it } from 'mocha';
import { assert } from 'chai';
import '../src/global';
import { sleep, isNode, isBrowser, debugLog } from '../src/global';
import { JSDOM } from 'jsdom';

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
    const str =
      '47KcZGxPayz3cJ3Vy6mKCFmz6N4kGkKm3TDnb9VVJ4krrgdu3WznRKyweh4n6KfWgXTm2LzdVqf8sPmjV1H2u6YR';
    const res = str.toExplorerUrl();
    assert.isNotEmpty(res);
    console.log(res);
  });

  it('debugLog', async () => {
    debugLog('debug test', { title: 'test' }, () => {
      return;
    });
  });

  it('sleep', async () => {
    const id = setInterval(console.log, 990, 'sleep count');
    await sleep(3);
    assert.isOk(id);
    clearInterval(id);
  });

  it('is Browser', async () => {
    const jsdom = new JSDOM('<html></html>');
    // @ts-expect-error
    global.window = jsdom.window;
    assert.isTrue(isBrowser());
  });

  it('is Node', async () => {
    assert.isTrue(isNode());
  });

  it('to sol', async () => {
    const lamports = 100000;
    const res = lamports.toSol();
    assert.equal(res, 0.0001);
  });

  it('to lamports', async () => {
    const sol = 0.0001;
    const res = sol.toLamports();
    assert.equal(res, 100000);
  });
});
