import test from 'ava';
import '../src';
import { Explorer } from '~/types/global';
import { execSync } from 'child_process';
import { Constants } from '../../suite-utils/src/constants';

const PUBKEY = '2xCW38UaYTaBtEqChPG7h7peidnxPS8UDAMLFKkKCJ5U';
const MINT = 'J2DUquFhToJbkEc4YSPuTjhZDXZvRaBUgUX5RW3cSsdr';
const SIG =
  '3Gs7pb8C9aZ8vkS5k1HrRB24TU4vofCZWM9JtUbMipof1hBmD6rT11css4gYGrgLZ1bp7chyqD7W7Gm8ZdvF9pF8';

test.after(() => {
  execSync('pnpm solana-suite-config -c localhost');
});

test('Create explorer url by address', (t) => {
  const res = PUBKEY.toExplorerUrl();
  t.not(res, undefined);
});

test('[SolanaFM]Create explorer url by address', (t) => {
  const res = PUBKEY.toExplorerUrl(Explorer.SolanaFM);
  t.not(res, undefined);
});

test('[SolanaFM][Mainnet-Beta]Create explorer url', async (t) => {
  execSync('pnpm solana-suite-config -c prd');
  await Constants.loadConfig();
  const url = SIG.toExplorerUrl(Explorer.SolanaFM);
  const res = /mainnet-beta/.test(url);
  t.true(res, url);
});

test('[SolanaFM][Devnet]Create explorer url', async (t) => {
  execSync('pnpm solana-suite-config -c dev');
  await Constants.loadConfig();
  const url = SIG.toExplorerUrl(Explorer.SolanaFM);
  const res = /devnet/.test(url);
  t.true(res, url);
});

test('[SolanaFM][Devnet, localhost]Create explorer url', async (t) => {
  execSync('pnpm solana-suite-config -c localhost');
  await Constants.loadConfig();
  const url = SIG.toExplorerUrl(Explorer.SolanaFM);
  const res = /devnet/.test(url);
  t.true(res, url);
});

test('[Xray]Create explorer url by signature', (t) => {
  const res = SIG.toExplorerUrl(Explorer.Xray);
  t.not(res, undefined);
});

test('[Xray]Create explorer url by address', (t) => {
  const res = PUBKEY.toExplorerUrl(Explorer.Xray);
  t.not(res, undefined);
});

test('[Xray]Create explorer url by mint address', (t) => {
  const res = MINT.toExplorerUrl(Explorer.Xray, { replacePath: 'token' });
  t.not(res, undefined);
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
