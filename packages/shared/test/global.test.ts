import { describe, it } from 'mocha';
import { assert } from 'chai';
import {
  sleep,
  isNode,
  isBrowser,
  debugLog,
  Try,
  Node,
  Constants,
  isPromise,
} from '../src';
import { JSDOM } from 'jsdom';

const PUBKEY = '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U';
const SIG =
  '47KcZGxPayz3cJ3Vy6mKCFmz6N4kGkKm3TDnb9VVJ4krrgdu3WznRKyweh4n6KfWgXTm2LzdVqf8sPmjV1H2u6YR';

describe('Global', () => {
  it('Create explorer url by address', async () => {
    const res = PUBKEY.toExplorerUrl();
    assert.isNotEmpty(res);
  });

  it('[Mainnet-Beta]Create explorer url', async () => {
    Node.changeConnection({ cluster: Constants.Cluster.prd });
    const url = SIG.toExplorerUrl();
    const res = /mainnet-beta/.test(url);
    assert.isTrue(res);
  });

  it('[Testnet]Create explorer url', async () => {
    Node.changeConnection({ cluster: Constants.Cluster.test });
    const url = SIG.toExplorerUrl();
    const res = /testnet/.test(url);
    assert.isTrue(res);
  });

  it('[Devnet]Create explorer url', async () => {
    Node.changeConnection({ cluster: Constants.Cluster.dev });
    const url = SIG.toExplorerUrl();
    const res = /devnet/.test(url);
    assert.isTrue(res);
  });

  it('[Devnet, localhost]Create explorer url', async () => {
    Node.changeConnection({ cluster: Constants.Cluster.localhost });
    const url = SIG.toExplorerUrl();
    const res = /devnet/.test(url);
    assert.isTrue(res);
  });

  it('[Devnet, custom]Create explorer url', async () => {
    console.log('# default clsuter url: ', Node.getConnection().rpcEndpoint);
    Node.changeConnection({
      cluster: Constants.Cluster.dev,
      customClusterUrl: ['https://dummy-solana-devnet.url'],
    });
    console.log('# update clsuter url: ', Node.getConnection().rpcEndpoint);
    const url = SIG.toExplorerUrl();
    const res = /devnet/.test(url);
    assert.isTrue(res);
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

  it('to sol part2', async () => {
    const lamports = 0.02;
    const res = lamports.toSol();
    assert.equal(res, 2e-11);
  });

  it('to lamports', async () => {
    const sol = 0.0001;
    const res = sol.toLamports();
    assert.equal(res, 100000);
  });

  it('to lamports part2', async () => {
    const sol = 0.00000000000009;
    const res = sol.toLamports();
    assert.equal(res, 0.00009);
  });

  it('promise isPromise()', () => {
    const mess = 'called promise';
    const promise = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(mess);
        }, 2000);
      });
    const res = isPromise(promise());
    assert.isTrue(res);
  });

  it('object isPromise()', () => {
    const res = isPromise({ test: 10 });
    assert.isFalse(res);
  });

  it('throw isPromise()', () => {
    const res = isPromise(() => {
      throw Error('throw');
    });
    assert.isFalse(res);
  });

  it('Result in try()', () => {
    const mess = 'result';
    const res = Try(() => {
      return mess;
    });
    res.isOk && assert.equal(res.value, mess);
  });

  it('Call function that return Result type in try()', () => {
    const fn = () => {
      return Try(() => {
        throw Error('return Result');
      });
    };

    const res2 = Try(() => {
      const res = fn();
      console.log('res: ', res);
    });
    console.log(res2);
  });

  it('Catch error in Try()', async () => {
    const errorMess = 'Dummy error';
    const res = await Try(() => {
      throw Error(errorMess);
    });
    res.isErr && assert.equal(res.error.message, errorMess);
  });

  it('Catch string in Try()', async () => {
    const errorMess2 = 'Dummy error2';
    const res2 = await Try(() => {
      throw errorMess2;
    });
    res2.isErr && assert.equal(res2.error.message, errorMess2);
  });

  it('Promise Try()', async () => {
    const mess = 'called promise';
    const promise = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(mess);
        }, 2000);
      });
    const res = await Try(async () => {
      return await promise();
    });
    res.isOk && assert.equal(res.value, mess);
  });

  it('Promise Try() with finally', async () => {
    const mess = 'called promise';
    const promise = () =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(mess);
        }, 2000);
      });
    const res = await Try(
      async () => {
        return await promise();
      },
      () => console.log('Step into finllaly logic')
    );
    res.isOk && assert.equal(res.value, mess);
  });
});
