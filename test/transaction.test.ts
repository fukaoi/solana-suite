import {describe, it} from 'mocha';
import {Transaction, Memo} from '../src';
import {assert} from 'chai';
import {ParsedConfirmedTransaction} from '@solana/web3.js';

const signature1 = 'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy';
const signature2 = '2nPdn7AhJiTLaopwxCBzPxSB9ucBeBJbyKttXVBh7CoCQkmhkB12yoT6CuFStbT6X6boi9eFEpJjtRUQYVPcvM3J';

describe('Transaction', () => {
  it('Get transaction data', async () => {
    const res = await Transaction.get(signature1);
    assert.isObject(res);
  });

  it('Get all transaction data', async () => {
    const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
    const res = await Transaction.getAll(tokenKey.toPubKey());
    if (res.isErr) return res;
    console.log(res)
    if (res.isOk) {
      assert.isArray(res.value);
      assert.isObject((<ParsedConfirmedTransaction[]>res.value)[0]);
    }
  });

  it('Transaction decode memo', async () => {
    const tx = await Transaction.get(signature2);
    if (tx.isErr) assert.isNotEmpty(tx);
    const res = Memo.parseInstruction(<ParsedConfirmedTransaction>tx.unwrap());
    console.log(`# decode: `, res);
    assert.equal(res, '{"tokenId": "dummy", "serialNo": "15/100"}');
  });
})
