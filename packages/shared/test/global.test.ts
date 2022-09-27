import { describe, it } from 'mocha';
import { assert } from 'chai';
import '../src/global';
import { sleep, isNode, isBrowser, debugLog,} from '../src/global';
import { Constants } from '../src/constants';
import { Node } from '../src/node';
import { JSDOM } from 'jsdom';

const dummyPubkey = '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U';
const dummySig =
  '47KcZGxPayz3cJ3Vy6mKCFmz6N4kGkKm3TDnb9VVJ4krrgdu3WznRKyweh4n6KfWgXTm2LzdVqf8sPmjV1H2u6YR';

describe('Global', () => {
  it('Convert string to PublicKey', async () => {
    const res = dummyPubkey.toPublicKey();
    assert.equal(res.constructor.name, 'PublicKey');
  });

  it('Create explorer url by address', async () => {
    const res = dummyPubkey.toExplorerUrl();
    assert.isNotEmpty(res);
    console.log(res);
  });

  it.only('[Mainnet-Beta]Create explorer url', async () => {
    Node.changeConnection({cluster: Constants.Cluster.prd});
    const url = dummySig.toExplorerUrl();
    console.log(url);
    const res = /mainnet-beta/.test(url);
    assert.isTrue(res);
  });

  it('[Mainnet-Beta, serum]Create explorer url', async () => {
    Node.changeConnection({cluster: Constants.Cluster.prd2});
    const url = dummySig.toExplorerUrl();
    console.log(url);
    const res = /mainnet-beta/.test(url);
    assert.isTrue(res);
  });

  it('[Testnet]Create explorer url', async () => {
    Node.changeConnection({cluster: Constants.Cluster.test});
    const url = dummySig.toExplorerUrl();
    console.log(url);
    const res = /testnet/.test(url);
    assert.isTrue(res);
  });

  it('[Devnet]Create explorer url', async () => {
    Node.changeConnection({cluster: Constants.Cluster.dev});
    const url = dummySig.toExplorerUrl();
    const res = /devnet/.test(url);
    assert.isTrue(res);
  });

  it('[Devnet, localhost]Create explorer url', async () => {
    Node.changeConnection({cluster: Constants.Cluster.localhost});
    const url = dummySig.toExplorerUrl();
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

  it('to lamports', async () => {
    const sol = 0.0001;
    const res = sol.toLamports();
    assert.equal(res, 100000);
  });
});
