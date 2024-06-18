import test from 'ava';
import { Constants } from '../src/';

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

test('DasApiUrl use dev', (t) => {
  const url = Constants.switchDasApi(Constants.Cluster.dev);
  t.true(Constants.DasApiUrl.dev.includes(url));
});


