import {describe, it} from 'mocha';
import {Transaction, Memo, Wallet, Multisig} from '../src';
import {Setup} from '../test/utils/setup';
import {assert} from 'chai';
import {ParsedConfirmedTransaction} from '@solana/web3.js';

const signature1 = 'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy';
const signature2 = '2nPdn7AhJiTLaopwxCBzPxSB9ucBeBJbyKttXVBh7CoCQkmhkB12yoT6CuFStbT6X6boi9eFEpJjtRUQYVPcvM3J';

let source: Wallet.KeypairStr;

describe('Transaction', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Get transaction data', async () => {
    const res = await Transaction.get(signature1);
    assert.isObject(res);
  });

  it('Get all transaction data', async () => {
    const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
    const res = await Transaction.getAll(tokenKey.toPubKey());
    if (res.isOk) {
      assert.isArray(res.value);
      assert.isObject((<ParsedConfirmedTransaction[]>res.value)[0]);
    } else {
      assert.isFalse(res.isErr, res.isErr && res.error.message);
    }
  });
})
