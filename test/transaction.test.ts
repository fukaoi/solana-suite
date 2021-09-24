import {describe, it} from 'mocha';
import {Transaction} from '../src/transaction';
import {Memo} from '../src/memo';
import {assert} from 'chai';
import {Wallet} from '../src/wallet';
import {SolNative} from '../src/sol-native';
import setupKeyPair from '../test/utils/setupKeyPair';
import {Util} from '../src/util';

const SIG = 'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy';
const SIG2 = '2nPdn7AhJiTLaopwxCBzPxSB9ucBeBJbyKttXVBh7CoCQkmhkB12yoT6CuFStbT6X6boi9eFEpJjtRUQYVPcvM3J';

let source: Wallet.Keypair;
let dest: Wallet.Keypair;

const sendContinuously = async(): Promise<void> => {
  await SolNative.transfer(
    source.pubkey, 
    [source.secret], 
    dest.pubkey, 
    0.0001
  )();
}

describe('Transaction', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('Get transaction data', async () => {
    const res = await Transaction.get(SIG);
    assert.isObject(res);
  });

  it('Subscribe a account(pubkey)', async() => {
    const subscribeId = Transaction.subscribeAccount(dest.pubkey, console.log);
    console.log('# subscribeId: ', subscribeId);
    for (let i = 0; i < 3; i++) await sendContinuously();
    await Util.sleep(15);
    Transaction.unsubscribeAccount(subscribeId);
    assert.ok('success subscribe');
  });

  it('Transaction decode memo', async () => {
    const tx = await Transaction.get(SIG2);
    if (!tx) throw new Error('Transaction not found');
    const res = Memo.parseInstruction(tx);
    console.log(`# decode: `, res);
    assert.equal(res, '{"tokenId": "dummy", "serialNo": "15/100"}');
  });
})
