import {describe, it} from 'mocha';
import {Transaction, Memo, Wallet, SolNative} from '../src';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';
import {Commitment} from '@solana/web3.js';

const signature1 = 'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy';
const signature2 = '2nPdn7AhJiTLaopwxCBzPxSB9ucBeBJbyKttXVBh7CoCQkmhkB12yoT6CuFStbT6X6boi9eFEpJjtRUQYVPcvM3J';

let source: Wallet.KeyPair;
let destination: Wallet.KeyPair;

describe('Transaction', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    destination = obj.dest;
  });

  it('Get transaction data', async () => {
    const res = await Transaction.get(signature1);
    assert.isObject(res);
  });

  it('Get all transaction data', async () => {
    const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
    const res = await Transaction.getAll(tokenKey.toPubKey());
    console.log(res)
    assert.isArray(res);
    assert.isObject(res[0]);
  });

  it('Confirmed signagure: `max`', async () => {
    await confirmedSigTest('max');
  });

  // it('Confirmed signagure: `confirmed`', async () => {
    // await confirmedSigTest('confirmed');
  // });

  // it('Confirmed signagure: `proceed`', async () => {
    // await confirmedSigTest('processed');
  // });

  it('Transaction decode memo', async () => {
    const tx = await Transaction.get(signature2);
    console.log(tx);
    const res = Memo.parseInstruction(tx!);
    console.log(`# decode: `, res);
    assert.equal(res, '{"tokenId": "dummy", "serialNo": "15/100"}');
  });
})

const confirmedSigTest = async (commitment: Commitment) => {
  const beforeBalance = await Wallet.getBalance(
    destination.pubkey.toPubKey()
  );
  console.log('# before balance: ', beforeBalance);
  const amount = 0.001;

  const sig = await SolNative.transfer(
    source.pubkey.toPubKey(),
    [source.secret.toKeypair()],
    destination.pubkey.toPubKey(),
    amount
  )();
  await Transaction.confirmedSig(sig, commitment);

  const afterBalance = await Wallet.getBalance(
    destination.pubkey.toPubKey()
  );
  console.log('# after balance: ', afterBalance);
  assert.equal(afterBalance, beforeBalance + amount);
}
