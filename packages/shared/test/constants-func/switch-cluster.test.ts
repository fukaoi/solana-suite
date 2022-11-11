import { describe, it } from 'mocha';
import { assert } from 'chai';
import { ConstantsFunc } from '../../src/constants-func';
import { Constants } from '../../src/constants/enum';

describe('Constants', () => {
  it('ConstantsFunc use test', () => {
    const cluster = ConstantsFunc.switchCluster(Constants.Cluster.test);
    assert.equal(cluster, Constants.EndPointUrl.test);
  });

  it('ConstantsFunc use dev', () => {
    const cluster = ConstantsFunc.switchCluster(Constants.Cluster.dev);
    assert.equal(cluster, Constants.EndPointUrl.dev);
  });

  it('ConstantsFunc use localhost', () => {
    const cluster = ConstantsFunc.switchCluster(Constants.Cluster.localhost);
    assert.equal(cluster, Constants.EndPointUrl.localhost);
  });

  it('ConstantsFunc use prd', () => {
    const cluster = ConstantsFunc.switchCluster(Constants.Cluster.prd);
    assert.equal(cluster, Constants.EndPointUrl.prd);
  });

  it('ConstantsFunc use prd2', () => {
    const cluster = ConstantsFunc.switchCluster(Constants.Cluster.prd2);
    assert.equal(cluster, Constants.EndPointUrl.prd2);
  });

  it('ConstantsFunc use round robin function in mainnet-beta', () => {
    for (let i = 0; i < 30; i++) {
      const cluster = ConstantsFunc.switchCluster(Constants.Cluster.prdrr);
      console.log('# cluster url: ', cluster);
      assert.isNotEmpty(cluster);
    }
  });
  it('ConstantsFunc use custom and customUrl', () => {
    const dummyUrl = 'https://hoge.hoge';
    const cluster = ConstantsFunc.switchCluster(
      Constants.Cluster.custom,
      dummyUrl
    );
    console.log('# cluster url: ', cluster);
    assert.equal(cluster, dummyUrl);
  });
});
