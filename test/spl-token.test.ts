import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';
import {Wallet, SplToken, Memo, Util} from '../src/'
import {Result} from '@badrap/result';

let source: Wallet.KeyPair;
let destination: Wallet.KeyPair;
let tokenKeyStr: string;

const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6'.toPubKey();
const MINT_DECIMAL = 2;

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    destination = obj.dest;
    tokenKeyStr = Setup.loadTokenTempFile();
  });

  it('Get token transfer history by tokenKey', async () => {
    const res = await SplToken.getTransferHistory(tokenKey, 3);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotEmpty(v.info.authority);
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer history by owner address', async () => {
    const owner = 'FbreoZcjxH4h8qfptQmGEGrwZLcPMbdHfoTJycAjtfu'.toPubKey();
    const res = await SplToken.getTransferHistory(owner);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotEmpty(v.info.authority);
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer destination history', async () => {
    const res = await SplToken.getTransferDestinationList(tokenKey);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.dest);
      assert.isNotNull(v.date);
    });
  });

  it('Create token', async () => {
    if (tokenKeyStr) {
      console.log(`# skip because loaded`);
      return;
    }
    const TOKEN_TOTAL_AMOUNT = 10000000;
    const res = await SplToken.create(
      source.secret.toKeypair(),
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL
    );
    console.log(`# tokenKey: ${res}`);
    assert.isTrue(res.isOk);
    assert.isNotEmpty(res);
    const token = res.unwrap();
    Setup.createTokenTempFile({tokenKey: token});
    tokenKeyStr = token;
  });

  it('Transfer token. source and destination inter send', async () => {
    const srcRes = await SplToken.transfer(
      tokenKeyStr.toPubKey(),
      source.secret.toKeypair(),
      destination.pubkey.toPubKey(),
      1,
      MINT_DECIMAL
    );
    assert.isTrue(srcRes.isOk);

    const destRes = await SplToken.transfer(
      tokenKeyStr.toPubKey(),
      destination.secret.toKeypair(),
      source.pubkey.toPubKey(),
      1,
      MINT_DECIMAL
    );
    assert.isTrue(destRes.isOk);
    assert.isNotEmpty(destRes);
  });

  it('Transfer transaction with memo data', async () => {
    const memoInst = Memo.createInstruction('{"tokenId": "dummy", "serialNo": "15/100"}');
    const res = await SplToken.transfer(
      tokenKeyStr.toPubKey(),
      source.secret.toKeypair(),
      destination.pubkey.toPubKey(),
      5,
      MINT_DECIMAL,
      memoInst
    );
    assert.isTrue(res.isOk);
    assert.isNotEmpty(res);
  });

  it('Subscribe a account(pubkey)', async () => {
    const subscribeId = SplToken.subscribeAccount(
      destination.pubkey.toPubKey(),
      (v: SplToken.TransferHistory) => {
        console.log('# Subscribe result: ', v);
        assert.isNotEmpty(v.type);
        assert.isNotNull(v.date);
        assert.isNotNull(v.info.mint);
        assert.isNotEmpty(v.info.source);
        assert.isNotEmpty(v.info.destination);
      }
    );
    for (let i = 0; i < 3; i++) await sendContinuously();
    await Util.sleep(15);
    SplToken.unsubscribeAccount(subscribeId);
    assert.ok('success subscribe');
  });
})

const sendContinuously = async (): Promise<void> => {
  await SplToken.transfer(
    tokenKeyStr.toPubKey(),
    source.secret.toKeypair(),
    destination.pubkey.toPubKey(),
    1,
    MINT_DECIMAL
  );
}


