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

  it('Transaction decode memo', async () => {
    const tx = await Transaction.get(signature2);
    if (tx.isErr) assert.isNotEmpty(tx);
    const res = Memo.parseInstruction(<ParsedConfirmedTransaction>tx.unwrap());
    console.log(`# decode: `, res);
    assert.equal(res, '{"tokenId": "dummy", "serialNo": "15/100"}');
  });

  it('Send instructions with fee payer', async () => {
    const before = (await Wallet.getBalance(source.pubkey.toPubKey())).unwrap();
    const owner = Wallet.create();
    const memoInst = Memo.createInstruction(
      '{"title": "send  instructions"}',
      [owner.pubkey.toPubKey()]
    );
    const res =
      await Transaction.sendInstruction(
        [
          source.secret.toKeypair(),
          owner.secret.toKeypair(),
        ],
      )({
        txInstructions: [memoInst],
        feePayer: source.pubkey.toPubKey()
      });

    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
    const after = (await Wallet.getBalance(source.pubkey.toPubKey())).unwrap();
    assert.isTrue(before > after, `before fee: ${before}, after fee: ${after}`);
  });
})
