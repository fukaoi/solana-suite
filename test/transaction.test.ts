import {describe, it} from 'mocha';
import {Transaction} from '../src/transaction';
import {assert, expect} from 'chai';

describe('Transaction', () => {
  it('Get transaction data', async () => {
    const res = await Transaction.get('WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy');
    assert.isObject(res);
  });
})
