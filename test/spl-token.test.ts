import {describe, it} from 'mocha';
import {SplToken} from '../src/spl-token';
import {Memo} from '../src/memo';
import {assert} from 'chai';
import setupKeyPair from '../test/utils/setupKeyPair';
import fs from 'fs';
import {Wallet} from '../src/wallet';

let source: Wallet.Keypair;
let dest: Wallet.Keypair;
let destPubkey: string;
let tokenId: string;

const TEMP_TOKEN_FILE = '.solana-spl-token';

const loadTokenTempFile = () => {
  const res = fs.readFileSync(TEMP_TOKEN_FILE, 'utf8');
  if (res) {
    const obj = JSON.parse(res);
    tokenId = obj.tokenId;
  }
  console.log(`# tokenId: ${tokenId}`);
}

const createTokenTempFile = async (data: Object) => {
  fs.writeFileSync(TEMP_TOKEN_FILE, JSON.stringify(data));
}

describe('SplToken', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
    dest = obj.dest;
    destPubkey = obj.dest.pubkey;
    fs.existsSync(TEMP_TOKEN_FILE) && loadTokenTempFile();
  });

  it('Get token transfer history', async () => {
    const tokenId = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
    const res = await SplToken.getTransferHistory(tokenId);
    assert.isArray(res);
    res.forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotEmpty(v.info.amount);
      assert.isNotEmpty(v.info.authority);
    });
  });

  it('Create token', async () => {
    if (tokenId) {
      console.log(`# skip because loaded`);
      return;
    }
    const TOKEN_TOTAL_AMOUNT = 10000000;
    const TOKEN_DECIMAL = 2;
    const res = await SplToken.create(source.secret, TOKEN_TOTAL_AMOUNT, TOKEN_DECIMAL);
    console.log(`# tokenId: ${res}`);
    assert.isObject(res);
    createTokenTempFile({tokenId: res});
  });

  it('Transfer token. source and destination inter send', async () => {
    const srcRes = await SplToken.transfer(tokenId, source.secret, destPubkey, 1);
    console.log(`# tx signature: ${srcRes}`);
    const destRes = await SplToken.transfer(tokenId, dest.secret, source.pubkey, 1);
    console.log(`# tx signature: ${destRes}`);
    assert.isNotEmpty(destRes);
  });

  it('Transfer transaction with memo data', async () => {
    const memoInst = Memo.createInstruction('{"tokenId": "dummy", "serialNo": "15/100"}');
    const res = await SplToken.transfer(tokenId, source.secret, destPubkey, 5, memoInst);
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });
})
