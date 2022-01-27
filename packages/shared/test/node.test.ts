import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Node} from '../src/node';
import {Constants, ConstantsFunc} from '../src';

describe('Node', () => {
  it('Connect', async () => {
    const res = Node.getConnection();
    assert.isNotEmpty(res);
    assert.propertyVal(res, '_rpcEndpoint', ConstantsFunc.switchApi(Constants.SolanaNet.dev));
  });

  it('Connect testnet', async () => {
    const res = Node.getConnection(Constants.SolanaNet.test);
    assert.isNotEmpty(res);
    assert.propertyVal(res, '_rpcEndpoint', ConstantsFunc.switchApi(Constants.SolanaNet.test));
  });

  it('Connect mainnet', async () => {
    const res = Node.getConnection(Constants.SolanaNet.prd);
    assert.isNotEmpty(res);
    assert.propertyVal(res, '_rpcEndpoint', ConstantsFunc.switchApi(Constants.SolanaNet.prd));
  });

  it('Connect devnet and modified commitment', async () => {
    const res = Node.getConnection(Constants.SolanaNet.dev, 'processed');
    assert.isNotEmpty(res);
    assert.propertyVal(res, '_commitment', 'processed');
    assert.propertyVal(res, '_rpcEndpoint', ConstantsFunc.switchApi(Constants.SolanaNet.dev));
  });
})
