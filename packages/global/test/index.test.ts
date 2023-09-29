import { describe, it } from 'mocha';
import { assert } from 'chai';
import '../src';
import { Constants } from 'shared';
import { Node } from 'node';
import { Explorer } from 'types/global';

const PUBKEY = '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U';
const SIG =
  '3Gs7pb8C9aZ8vkS5k1HrRB24TU4vofCZWM9JtUbMipof1hBmD6rT11css4gYGrgLZ1bp7chyqD7W7Gm8ZdvF9pF8';

describe('Global', () => {
  it('Create explorer url by address', async () => {
    const res = PUBKEY.toExplorerUrl();
    assert.isNotEmpty(res);
  });

  it('[SolanaFM]Create explorer url by address', async () => {
    const res = PUBKEY.toExplorerUrl(Explorer.SolanaFM);
    assert.isNotEmpty(res);
  });

  it('[SolanaFM][Mainnet-Beta]Create explorer url', async () => {
    Node.changeConnection({ cluster: Constants.Cluster.prd });
    const url = SIG.toExplorerUrl(Explorer.SolanaFM);
    const res = /mainnet-beta/.test(url);
    assert.isTrue(res);
  });

  it('[SolanaFM][Testnet]Create explorer url', async () => {
    Node.changeConnection({ cluster: Constants.Cluster.test });
    const url = SIG.toExplorerUrl(Explorer.SolanaFM);
    const res = /testnet/.test(url);
    assert.isTrue(res);
  });

  it('[SolanaFM][Devnet]Create explorer url', async () => {
    Node.changeConnection({ cluster: Constants.Cluster.dev });
    const url = SIG.toExplorerUrl(Explorer.SolanaFM);
    const res = /devnet/.test(url);
    assert.isTrue(res);
  });

  it('[SolanaFM][Devnet, localhost]Create explorer url', async () => {
    Node.changeConnection({ cluster: Constants.Cluster.localhost });
    const url = SIG.toExplorerUrl(Explorer.SolanaFM);
    const res = /devnet/.test(url);
    assert.isTrue(res);
  });

  it('[SolanaFM][Devnet, custom]Create explorer url', async () => {
    console.log('# default clsuter url: ', Node.getConnection().rpcEndpoint);
    Node.changeConnection({
      cluster: Constants.Cluster.dev,
      customClusterUrl: ['https://dummy-solana-devnet.url'],
    });
    console.log('# update clsuter url: ', Node.getConnection().rpcEndpoint);
    const url = SIG.toExplorerUrl(Explorer.SolanaFM);
    const res = /devnet/.test(url);
    assert.isTrue(res);
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
});
