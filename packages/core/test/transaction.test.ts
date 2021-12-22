import {describe, it} from 'mocha';
import {assert} from 'chai';
import {ParsedConfirmedTransaction} from '@solana/web3.js';
import {Setup} from '../../shared/test/setup';
import {KeypairStr, SplToken, Transaction} from '../src/'

const signature1 = 'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy';
const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6'.toPubkey();

let source: KeypairStr;
let dest: KeypairStr;
let tokenKeyStr: string;

describe('Transaction', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    dest = obj.dest;
  });

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
  it('Get token transfer history by tokenKey', async () => {
    const limit = 3;
    const res = await Transaction.getTransferHistory(tokenKey, 3);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotEmpty(v.info.authority);
      assert.isNotNull(v.date);
    });
    assert.equal(res.unwrap().length, limit);
  });

  it.skip('Get token transfer history by owner address', async () => {
    const limit = 3;
    const owner = 'FbreoZcjxH4h8qfptQmGEGrwZLcPMbdHfoTJycAjtfu'.toPubkey();
    const res = await Transaction.getTransferHistory(owner, limit);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotEmpty(v.info.authority);
      assert.isNotNull(v.date);
    });
    assert.equal(res.unwrap().length, limit);
  });

  it('Get token transfer destination history', async () => {
    const res = await Transaction.getTransferDestinationList(tokenKey);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.dest);
      assert.isNotNull(v.date);
    });
  });

  it('Subscribe a account(pubkey)', async () => {
    const subscribeId = Transaction.subscribeAccount(
      dest.pubkey.toPubkey(),
      (v: Transaction.TransferHistory) => {
        console.log('# Subscribe result: ', v);
        assert.isNotEmpty(v.type);
        assert.isNotNull(v.date);
        assert.isNotNull(v.info.mint);
        assert.isNotEmpty(v.info.source);
        assert.isNotEmpty(v.info.destination);
      }
    );
    for (let i = 0; i < 3; i++) await sendContinuously();
    await sleep(15);
    Transaction.unsubscribeAccount(subscribeId);
    assert.ok('success subscribe');
  });
});

const sendContinuously = async (): Promise<void> => {
  const TOKEN_TOTAL_AMOUNT = 10000000;
  const MINT_DECIMAL = 2;

  const inst1 =
    await SplToken.mint(
      source.toPubkey(),
      [source.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL
    );

  const inst2 = await SplToken.transfer(
    tokenKeyStr.toPubkey(),
    source.pubkey.toPubkey(),
    dest.pubkey.toPubkey(),
    [source.secret.toKeypair()],
    1,
    MINT_DECIMAL
  );

  const res = await [inst1, inst2].submit();
  res.isErr && console.error(res.error);
}

const sleep = async (sec: number) => new Promise(r => setTimeout(r, sec * 1000));


