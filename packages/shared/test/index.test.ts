import test from 'ava';
import { Constants } from '../src/';

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

test('Constants use dev', (t) => {
  const cluster = Constants.switchCluster({ cluster: Constants.Cluster.dev });
  t.is(cluster, Constants.EndPointUrl.dev);
});

test('Constants use localhost', (t) => {
  const cluster = Constants.switchCluster({
    cluster: Constants.Cluster.localhost,
  });
  t.is(cluster, Constants.EndPointUrl.localhost);
});

test('Constants use prd', (t) => {
  const cluster = Constants.switchCluster({ cluster: Constants.Cluster.prd });
  t.is(cluster, Constants.EndPointUrl.prd);
});
