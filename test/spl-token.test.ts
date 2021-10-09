import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';
import {Wallet, SplToken, Memo, Util} from '../src/'
import fs from 'fs';

let source: Wallet.KeyPair;
let destination: Wallet.KeyPair;
let tokenKeyStr: string;

const TEMP_TOKEN_FILE = '.solana-spl-token';
const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6'.toPubKey();
const MINT_DECIMAL = 2;

const loadTokenTempFile = () => {
  const res = fs.readFileSync(TEMP_TOKEN_FILE, 'utf8');
  if (res) {
    const obj = JSON.parse(res);
    tokenKeyStr = obj.tokenKey;
  }
  console.log(`# tokenKey: ${tokenKeyStr}`);
}

const createTokenTempFile = async (data: Object) => {
  fs.writeFileSync(TEMP_TOKEN_FILE, JSON.stringify(data));
}

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    destination = obj.dest;
    fs.existsSync(TEMP_TOKEN_FILE) && loadTokenTempFile();
  });

  it('Get token transfer history by tokenKey', async () => {
    const res = await SplToken.getTransferHistory(tokenKey, 3);
    console.log(res);
    assert.isArray(res);
    res.forEach((v) => {
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
    assert.isArray(res);
    res.forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotEmpty(v.info.authority);
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer destination history', async () => {
    const res = await SplToken.getTransferDestinationList(tokenKey);
    assert.isArray(res);
    res.forEach((v) => {
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
    assert.isNotEmpty(res);
    createTokenTempFile({tokenKey: res});
    tokenKeyStr = res;
  });

  it('Transfer token. source and destination inter send', async () => {
    const srcRes = await SplToken.transfer(
      tokenKeyStr.toPubKey(),
      source.secret.toKeypair(),
      destination.pubkey.toPubKey(),
      1,
      MINT_DECIMAL
    );
    console.log(`# tx signature: ${srcRes.toSigUrl()}`);
    const destRes = await SplToken.transfer(
      tokenKeyStr.toPubKey(),
      destination.secret.toKeypair(),
      source.pubkey.toPubKey(),
      1,
      MINT_DECIMAL
    );
    console.log(`# tx signature: ${destRes.toSigUrl()}`);
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
    console.log(`# tx signature: ${res.toSigUrl()}`);
    assert.isNotEmpty(res);
  });

  it.only('Subscribe a account(pubkey)', async () => {
    const subscribeId = SplToken.subscribeAccount(
      destination.pubkey.toPubKey(),
      console.log
    );
    console.log('# subscribeId: ', subscribeId);
    for (let i = 0; i < 1; i++) await sendContinuously();
    await Util.sleep(15);
    SplToken.unsubscribeAccount(subscribeId);
    assert.ok('success subscribe');
  });
})

const sendContinuously = async (): Promise<void> => {
  // await SolNative.transfer(
  // source.pubkey.toPubKey(),
  // [source.secret.toKeypair()],
  // destination.pubkey.toPubKey(),
  // 0.0001
  // )();
  const tokenKey = await SplToken.create(
    source.secret.toKeypair(),
    1,
    2,
  );
  console.log(tokenKey);
  const srcRes = await SplToken.transfer(
    tokenKey.toPubKey(),
    source.secret.toKeypair(),
    destination.pubkey.toPubKey(),
    1,
    2
  );
  console.log(srcRes);
}


