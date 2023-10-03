import test from 'ava';
import '../src';
import { Constants } from 'shared';
import { Node } from 'node';
import { Explorer } from 'types/global';

const PUBKEY = '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U';
const SIG =
  '3Gs7pb8C9aZ8vkS5k1HrRB24TU4vofCZWM9JtUbMipof1hBmD6rT11css4gYGrgLZ1bp7chyqD7W7Gm8ZdvF9pF8';

test('Create explorer url by address', (t) => {
  const res = PUBKEY.toExplorerUrl();
  t.not(res, undefined);
});

test('[SolanaFM]Create explorer url by address', (t) => {
  const res = PUBKEY.toExplorerUrl(Explorer.SolanaFM);
  t.not(res, undefined);
});

test('[SolanaFM][Mainnet-Beta]Create explorer url', (t) => {
  Node.changeConnection({ cluster: Constants.Cluster.prd });
  const url = SIG.toExplorerUrl(Explorer.SolanaFM);
  const res = /mainnet-beta/.test(url);
  t.true(res);
});

test('[SolanaFM][Testnet]Create explorer url', (t) => {
  Node.changeConnection({ cluster: Constants.Cluster.test });
  const url = SIG.toExplorerUrl(Explorer.SolanaFM);
  const res = /testnet/.test(url);
  t.true(res);
});

test('[SolanaFM][Devnet]Create explorer url', (t) => {
  Node.changeConnection({ cluster: Constants.Cluster.dev });
  const url = SIG.toExplorerUrl(Explorer.SolanaFM);
  const res = /devnet/.test(url);
  t.true(res);
});

test('[SolanaFM][Devnet, localhost]Create explorer url', (t) => {
  Node.changeConnection({ cluster: Constants.Cluster.localhost });
  const url = SIG.toExplorerUrl(Explorer.SolanaFM);
  const res = /devnet/.test(url);
  t.true(res);
});

test('[SolanaFM][Devnet, custom]Create explorer url', (t) => {
  console.log('# default clsuter url: ', Node.getConnection().rpcEndpoint);
  Node.changeConnection({
    cluster: Constants.Cluster.dev,
    customClusterUrl: ['https://dummy-solana-devnet.url'],
  });
  console.log('# update clsuter url: ', Node.getConnection().rpcEndpoint);
  const url = SIG.toExplorerUrl(Explorer.SolanaFM);
  const res = /devnet/.test(url);
  t.true(res);
});

test('to sol', (t) => {
  const lamports = 100000;
  const res = lamports.toSol();
  t.is(res, 0.0001);
});

test('to sol part2', (t) => {
  const lamports = 0.02;
  const res = lamports.toSol();
  t.is(res, 2e-11);
});

test('to lamports', (t) => {
  const sol = 0.0001;
  const res = sol.toLamports();
  t.is(res, 100000);
});

test('to lamports part2', (t) => {
  const sol = 0.00000000000009;
  const res = sol.toLamports();
  t.is(res, 0.00009);
});
