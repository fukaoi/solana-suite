import {describe, it} from 'mocha';
import {Transaction, Memo, Wallet, SolNative} from '../src';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';
import {Commitment, ParsedConfirmedTransaction} from '@solana/web3.js';

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
    if (res.isFail()) return res;
    console.log(res)
    assert.isArray(res.value);
    assert.isObject((<ParsedConfirmedTransaction[]>res.value)[0]);
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
    if (tx.isFail()) assert.isNotEmpty(tx);
    const res = Memo.parseInstruction(<ParsedConfirmedTransaction>tx.value);
    console.log(`# decode: `, res);
    assert.equal(res, '{"tokenId": "dummy", "serialNo": "15/100"}');
  });
})

const confirmedSigTest = async (commitment: Commitment) => {
  const beforeBalance = (await Wallet.getBalance(
    destination.pubkey.toPubKey()
  )).value;
  console.log('# before balance: ', beforeBalance);
  const amount = 0.001;

  const sig = await SolNative.transfer(
    source.pubkey.toPubKey(),
    [source.secret.toKeypair()],
    destination.pubkey.toPubKey(),
    amount
  )();

  if (sig.isFail()) assert.isNotEmpty(sig);

  await Transaction.confirmedSig(<string>sig.value, commitment);

  const afterBalance = (await Wallet.getBalance(
    destination.pubkey.toPubKey()
  )).value;
  console.log('# after balance: ', afterBalance);
  assert.equal(afterBalance, <number>beforeBalance + amount);
}
