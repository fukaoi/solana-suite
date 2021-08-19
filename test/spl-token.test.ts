import {describe, it} from 'mocha';
import {SplToken} from '../src/spl-token';
import {Memo} from '../src/memo';
import {assert} from 'chai'
import setupKeyPair from '../test/utils/setupKeyPair';
import fs from 'fs';
import {Wallet} from '../src/wallet';

let source: Wallet.Keypair;
let dest: Wallet.Keypair;
let destPubkey: string;
let tokenId: string;
let nft: string;

const TEMP_TOKEN_FILE = '.solana-spl-token';
const TEMP_NFT_FILE = '.solana-nft-token';

const loadTokenTempFile = () => {
  const res = fs.readFileSync(TEMP_TOKEN_FILE, 'utf8');
  if (res) {
    const obj = JSON.parse(res);
    tokenId = obj.tokenId;
  }
  console.log(`# tokenId: ${tokenId}`);
}

const loadNftTempFile = () => {
  const res = fs.readFileSync(TEMP_NFT_FILE, 'utf8');
  if (res) {
    const obj = JSON.parse(res);
    nft = obj.nft;
  }
  console.log(`# nft: ${nft}`);
}

const createTokenTempFile = async (data: Object) => {
  fs.writeFileSync(TEMP_TOKEN_FILE, JSON.stringify(data));
}

const createNftTempFile = async (data: Object) => {
  fs.writeFileSync(TEMP_NFT_FILE, JSON.stringify(data));
}

describe('SplToken', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
    dest = obj.dest;
    destPubkey = obj.dest.pubkey;
    fs.existsSync(TEMP_TOKEN_FILE) && loadTokenTempFile();
    fs.existsSync(TEMP_NFT_FILE) && loadNftTempFile();
  });

  it('Create token', async () => {
    if (tokenId) {
      console.log(`# skip because loaded`);
      return;
    }
    const TOKEN_TOTAL_AMOUNT = 10000000;
    const TOKEN_DECIMAL = 2;
    const res = await SplToken.create(source.secret, TOKEN_TOTAL_AMOUNT, TOKEN_DECIMAL);
    console.log(`# tokenId: ${res.tokenId}`);
    tokenId = res.tokenId;
    assert.isObject(res);
    createTokenTempFile({tokenId: tokenId});
  });

  it('Create nft', async () => {
    if (nft) {
      console.log(`# skip because loaded`);
      return;
    }
    const res = await SplToken.createNft(source.secret);
    console.log(`# nft: ${res.tokenId}`);
    nft = res.tokenId;
    assert.isObject(res);
    createNftTempFile({nft: nft});
  });

  it('Transfer token. source and destination inter send', async () => {
    const srcRes = await SplToken.transfer(tokenId, source.secret, destPubkey, 1);
    console.log(`# tx signature: ${srcRes}`);
    const destRes = await SplToken.transfer(tokenId, dest.secret, source.pubkey, 1);
    console.log(`# tx signature: ${destRes}`);
    assert.isNotEmpty(destRes);
  });

  it('Transfer nft, source and destination inter send', async () => {
    const srcRes = await SplToken.transferNft(nft, source.secret, destPubkey);
    console.log(`# tx signature: ${srcRes}`);
    assert.isNotEmpty(srcRes);
    const destRes = await SplToken.transferNft(nft, dest.secret, source.pubkey);
    console.log(`# tx signature: ${destRes}`);
    assert.isNotEmpty(destRes);
  });

  it('Transfer transaction with memo data', async () => {
    const memoInst = Memo.createInstruction('{"tokenId": "dummy", "serialNo": "15/100"}');
    const res = await SplToken.transfer(tokenId, source.secret, destPubkey, 5, memoInst);
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });

  it('Transfer nft with memo data, source and destination inter send', async () => {
    const memoInst = Memo.createInstruction('{"nft": "art", "url": "http://hoge.hoge"}');
    const srcRes = await SplToken.transferNft(nft, source.secret, destPubkey, memoInst);
    console.log(`# tx signature: ${srcRes}`);
    assert.isNotEmpty(srcRes);
    const destRes = await SplToken.transferNft(nft, dest.secret, source.pubkey, memoInst);
    console.log(`# tx signature: ${destRes}`);
    assert.isNotEmpty(destRes);
  });

  it('Set metadata at nft on blockchain', () => {
    SplToken.setMetaData('', '', '', ['']);
  }); 
})
