import {describe, it} from 'mocha';
import {Transaction} from '../src';
import {assert} from 'chai';
import {ParsedConfirmedTransaction} from '@solana/web3.js';

const signature1 = 'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy';

describe('Transaction', () => {
  it('Get transaction data', async () => {
    const res = await Transaction.get(signature1);
    assert.isObject(res);
  });

  it('Get all transaction data', async () => {
    const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
    const res = await Transaction.getAll(tokenKey.toPubkey());
    if (res.isOk) {
      assert.isArray(res.value);
      assert.isObject((res.value as ParsedConfirmedTransaction[])[0]);
    } else {
      assert.isFalse(res.isErr, res.isErr && res.error.message);
    }
  });
})
