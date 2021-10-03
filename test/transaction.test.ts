import {describe, it} from 'mocha';
import {Transaction} from '../src/transaction';
import {Memo} from '../src/memo';
import {assert} from 'chai';
import {Wallet} from '../src/wallet';
import {SolNative} from '../src/sol-native';
import {Setup} from '../test/utils/setup';
import {Util} from '../src/util';

const signature1 = 'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy';
const signature2 = '2nPdn7AhJiTLaopwxCBzPxSB9ucBeBJbyKttXVBh7CoCQkmhkB12yoT6CuFStbT6X6boi9eFEpJjtRUQYVPcvM3J';

let source: Wallet.KeyPair;
let destination: Wallet.KeyPair;

const sendContinuously = async (): Promise<void> => {
  await SolNative.transfer(
    source.pubkey.toPubKey(),
    [source.secret.toKeypair()],
    destination.pubkey.toPubKey(),
    0.0001
  )();
}

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
    assert.isArray(res);
    assert.isObject(res[0]);
  });

  it('Subscribe a account(pubkey)', async () => {
    const subscribeId = Transaction.subscribeAccount(
      destination.pubkey.toPubKey(), 
      console.log
    );
    console.log('# subscribeId: ', subscribeId);
    for (let i = 0; i < 3; i++) await sendContinuously();
    await Util.sleep(15);
    Transaction.unsubscribeAccount(subscribeId);
    assert.ok('success subscribe');
  });

  it('Transaction decode memo', async () => {
    const tx = await Transaction.get(signature2);
    console.log(tx);
    const res = Memo.parseInstruction(tx!);
    console.log(`# decode: `, res);
    assert.equal(res, '{"tokenId": "dummy", "serialNo": "15/100"}');
  });
})
