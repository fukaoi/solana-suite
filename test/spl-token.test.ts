import {describe, it} from 'mocha';
import {SplToken} from '../src/spl-token';
import {Memo} from '../src/memo';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';
import {Wallet} from '../src/wallet';
import fs from 'fs';

let source: Wallet.KeyPair;
let dest: Wallet.KeyPair;
let tokenKeyStr: string;

const TEMP_TOKEN_FILE = '.solana-spl-token';
const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6'.toPubKey();

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
    dest = obj.dest;
    fs.existsSync(TEMP_TOKEN_FILE) && loadTokenTempFile();
  });

  it('Get token transfer history by tokenKey', async () => {
    const res = await SplToken.getTransferHistory(tokenKey);
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
    const TOKEN_DECIMAL = 2;
    const res = await SplToken.create(source.secret.toKeypair(), TOKEN_TOTAL_AMOUNT, TOKEN_DECIMAL);
    console.log(`# tokenKey: ${res}`);
    assert.isObject(res);
    createTokenTempFile({tokenKey: res});
  });

  it('Transfer token. source and destination inter send', async () => {
    const srcRes = await SplToken.transfer(
      tokenKeyStr.toPubKey(),
      source.secret.toKeypair(),
      dest.pubkey.toPubKey(), 1
    );
    console.log(`# tx signature: ${srcRes}`);
    const destRes = await SplToken.transfer(tokenKeyStr.toPubKey(), dest.secret.toKeypair(), source.pubkey.toPubKey(), 1);
    console.log(`# tx signature: ${destRes}`);
    assert.isNotEmpty(destRes);
  });

  it('Transfer transaction with memo data', async () => {
    const memoInst = Memo.createInstruction('{"tokenId": "dummy", "serialNo": "15/100"}');
    const res = await SplToken.transfer(tokenKeyStr.toPubKey(), source.secret.toKeypair(), dest.pubkey.toPubKey(), 5, memoInst);
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });
})
