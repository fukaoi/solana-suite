import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Node } from '../src/node';
import { Constants } from '../src/constants';

describe('Node', () => {
  it('Connect devnet', async () => {
    Node.changeConnection({ cluster: Constants.Cluster.dev });
    const res = Node.getConnection();
    assert.isNotEmpty(res);
    assert.propertyVal(
      res,
      '_rpcEndpoint',
      Constants.switchCluster({ cluster: Constants.Cluster.dev })
    );
  });

  it('Connect testnet', async () => {
    Node.changeConnection({ cluster: Constants.Cluster.test });
    const res = Node.getConnection();
    assert.isNotEmpty(res);
    assert.propertyVal(
      res,
      '_rpcEndpoint',
      Constants.switchCluster({ cluster: Constants.Cluster.test })
    );
  });

  it('Connect mainnet', async () => {
    Node.changeConnection({ cluster: Constants.Cluster.prd });
    const res = Node.getConnection();
    assert.isNotEmpty(res);
    assert.propertyVal(
      res,
      '_rpcEndpoint',
      Constants.switchCluster({ cluster: Constants.Cluster.prd })
    );
  });

  it('Connect devnet for localhost', async () => {
    Node.changeConnection({ cluster: Constants.Cluster.localhost });
    const res = Node.getConnection();
    assert.isNotEmpty(res);
    assert.propertyVal(
      res,
      '_rpcEndpoint',
      Constants.switchCluster({ cluster: Constants.Cluster.localhost })
    );
  });

  it('Connect devnet for localhost by default no parameter', async () => {
    const res = Node.getConnection();
    assert.isNotEmpty(res);
    assert.propertyVal(
      res,
      '_rpcEndpoint',
      Constants.switchCluster({ cluster: Constants.Cluster.localhost })
    );
  });

  it('Connect devnet and modified commitment', async () => {
    Node.changeConnection({
      cluster: Constants.Cluster.dev,
      commitment: 'processed',
    });
    const res = Node.getConnection();
    assert.isNotEmpty(res);
    assert.propertyVal(res, '_commitment', 'processed');
    assert.propertyVal(
      res,
      '_rpcEndpoint',
      Constants.switchCluster({ cluster: Constants.Cluster.dev })
    );
  });

  it('Change cluster destination, check singleton object', async () => {
    const res = Node.getConnection().rpcEndpoint;
    Node.changeConnection({ cluster: Constants.Cluster.prd });
    const res2nd = Node.getConnection().rpcEndpoint;
    assert.notEqual(res, res2nd);
    const res3rd = Node.getConnection().rpcEndpoint;
    assert.equal(res2nd, res3rd);
  });

  it('Change custom cluster url', async () => {
    const customClusterUrl = ['https://dummy-solana-devnet.url'];
    const before = Node.getConnection().rpcEndpoint;
    console.log('# default clsuter url: ', before);
    Node.changeConnection({
      customClusterUrl,
    });
    const after = Node.getConnection().rpcEndpoint;
    console.log('# default clsuter url: ', after);
    assert.equal(after, customClusterUrl[0]);
  });

  it('Change custom cluster urls', async () => {
    const customClusterUrl = [
      'https://dummy-solana-devnet.url',
      'https://dummy2-solana-devnet.url',
      'https://dummy3-solana-devnet.url',
    ];
    const before = Node.getConnection().rpcEndpoint;
    console.log('# default clsuter url: ', before);
    Node.changeConnection({
      customClusterUrl,
    });
    const after = Node.getConnection().rpcEndpoint;
    console.log('# default clsuter url: ', after);
    assert.include(customClusterUrl.join(''), after);
  });

  it('Change commitment, check singleton object', async () => {
    const res = Node.getConnection().commitment;
    Node.changeConnection({
      commitment: 'finalized',
    });
    const res2nd = Node.getConnection().commitment;
    assert.notEqual(res, res2nd);
    const res3rd = Node.getConnection().commitment;
    assert.equal(res2nd, res3rd);
  });

  it('Change commitment destination, check singleton object', async () => {
    const res = Node.getConnection().commitment;
    Node.changeConnection({
      cluster: Constants.Cluster.prd,
      commitment: 'processed',
    });
    const res2nd = Node.getConnection().commitment;
    assert.notEqual(res, res2nd);
    const res3rd = Node.getConnection().commitment;
    assert.equal(res2nd, res3rd);
  });
});
