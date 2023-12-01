import test from 'ava';
import { Constants } from '../src/';
import { execSync } from 'child_process';

test('Fetch nft.storage api key in solana-suite.json', (t) => {
  const apiKey = Constants.NFT_STORAGE_API_KEY;
  t.is(
    apiKey,
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE',
  );
});

test('Constants use test', (t) => {
  const cluster = Constants.switchCluster({
    cluster: Constants.Cluster.test,
  });
  t.is(cluster, Constants.EndPointUrl.test);
});

test('Cluster use dev', (t) => {
  const cluster = Constants.switchCluster({ cluster: Constants.Cluster.dev });
  t.is(cluster, Constants.EndPointUrl.dev);
});

test('Cluster use localhost', (t) => {
  const cluster = Constants.switchCluster({
    cluster: Constants.Cluster.localhost,
  });
  t.is(cluster, Constants.EndPointUrl.localhost);
});

test('Cluster use prd', (t) => {
  const cluster = Constants.switchCluster({ cluster: Constants.Cluster.prd });
  t.is(cluster, Constants.EndPointUrl.prd);
});

test('Bundlr use prd', (t) => {
  const url = Constants.switchBundlr(Constants.Cluster.prd);
  t.true(Constants.BundlrUrl.prd.includes(url));
});

test('Bundlr use dev', (t) => {
  const url = Constants.switchBundlr(Constants.Cluster.dev);
  t.is(url, Constants.BundlrUrl.dev);
});

test.only('DasApiUrl use prd', (t) => {
  const res = execSync('pnpm solana-suite-config -das "https://das.demo.org"');
  console.log(res.toString());
  // const url = Constants.switchDasApi(Constants.Cluster.prd);
});

test('[Error]DasApiUrl use prd', (t) => {
  t.throws(() => {
    Constants.switchDasApi(Constants.Cluster.prd);
  });
});

test('DasApiUrl use dev', (t) => {
  const url = Constants.switchDasApi(Constants.Cluster.dev);
  t.true(Constants.DasApiUrl.dev.includes(url));
});

test('[Error]NftStorageApiKey use prd', (t) => {
  t.throws(() => {
    Constants.switchNftStorage(Constants.Cluster.prd);
  });
});

test('NftStorageApiKey use dev', (t) => {
  const url = Constants.switchNftStorage(Constants.Cluster.dev);
  t.true(Constants.NftstorageApiKey.dev.includes(url));
});
