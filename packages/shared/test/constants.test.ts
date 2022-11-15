import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Constants } from '../src/constants';

describe('Constants', () => {
  it('Fetch nft.storage api key in solana-suite.json', () => {
    const apiKey = Constants.NFT_STORAGE_API_KEY;
    assert.equal(
      apiKey,
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweERGMjcyN2VkODZhRGU1RTMyZDZDZEJlODc0YzRFNDlEODY1OWZmOEMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyMDI2NDk0MzcwNiwibmFtZSI6ImRlbW8ifQ.d4J70mikxRB8a5vwNu6SO5HDA8JaueuseAj7Q_ytMCE'
    );
  });

  it('Constants use test', () => {
    const cluster = Constants.switchCluster('testnet');
    assert.equal(cluster, Constants.EndPointUrl.test);
  });

  it('Constants use dev', () => {
    const cluster = Constants.switchCluster(Constants.Cluster.dev);
    assert.equal(cluster, Constants.EndPointUrl.dev);
  });

  it('Constants use localhost', () => {
    const cluster = Constants.switchCluster(Constants.Cluster.localhost);
    assert.equal(cluster, Constants.EndPointUrl.localhost);
  });

  it('Constants use prd', () => {
    const cluster = Constants.switchCluster(Constants.Cluster.prd);
    assert.equal(cluster, Constants.EndPointUrl.prd);
  });

  it('Constants use prd2', () => {
    const cluster = Constants.switchCluster(Constants.Cluster.prd2);
    assert.equal(cluster, Constants.EndPointUrl.prd2);
  });

  it('Constants use round robin function in mainnet-beta', () => {
    for (let i = 0; i < 30; i++) {
      const cluster = Constants.switchCluster(Constants.Cluster.prdrr);
      console.log('# cluster url: ', cluster);
      assert.isNotEmpty(cluster);
    }
  });
  it('Constants use custom and customUrl', () => {
    const dummyUrl = 'https://hoge.hoge';
    const cluster = Constants.switchCluster(Constants.Cluster.custom, dummyUrl);
    console.log('# cluster url: ', cluster);
    assert.equal(cluster, dummyUrl);
  });
});
