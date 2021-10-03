import {describe, it} from 'mocha';
import {Memo} from '../../../src/memo';
import {assert} from 'chai'
import {Setup} from '../../../test/utils/setup';
import {Wallet} from '../../../src/wallet';
import {SplNft} from '../../../src/nft/spl';
import fs from 'fs';

let source: Wallet.KeyPair;
let destination: Wallet.KeyPair;
let tokenKey: string;

const TEMP_NFT_FILE = '.solana-nft-token';

const loadNftTempFile = () => {
  const res = fs.readFileSync(TEMP_NFT_FILE, 'utf8');
  if (res) {
    const obj = JSON.parse(res);
    tokenKey = obj.nft;
  }
  console.log(`# nft: ${tokenKey}`);
}

const createNftTempFile = async (data: Object) => {
  fs.writeFileSync(TEMP_NFT_FILE, JSON.stringify(data));
}

describe('NftSpl', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    destination = obj.dest;
    fs.existsSync(TEMP_NFT_FILE) && loadNftTempFile();
  });

  it('Create nft', async () => {
    if (tokenKey) {
      console.log(`# skip because loaded`);
      return;
    }
    const res = await SplNft.create(source.secret.toKeypair());
    console.log(`# nft: ${res}`);
    assert.isObject(res);
    createNftTempFile({nft: res});
  });

  it('Transfer nft, source and destination inter send', async () => {
    const srcRes = await SplNft.transfer(
      tokenKey.toPubKey(),
      source.secret.toKeypair(),
      destination.pubkey.toPubKey()
    );
    console.log(`# tx signature: ${srcRes}`);
    assert.isNotEmpty(srcRes);
    const destRes = await SplNft.transfer(
      tokenKey.toPubKey(),
      destination.secret.toKeypair(),
      source.pubkey.toPubKey()
    );
    console.log(`# tx signature: ${destRes}`);
    assert.isNotEmpty(destRes);
  });

  it('Transfer nft with memo data, source and destination inter send', async () => {
    const memoInst = Memo.createInstruction('{"nft": "art", "url": "http://hoge.hoge"}');
    const srcRes = await SplNft.transfer(
      tokenKey.toPubKey(),
      source.secret.toKeypair(),
      destination.pubkey.toPubKey(),
      memoInst
    );
    console.log(`# tx signature: ${srcRes}`);
    assert.isNotEmpty(srcRes);
    const destRes = await SplNft.transfer(
      tokenKey.toPubKey(),
      destination.secret.toKeypair(),
      source.pubkey.toPubKey(),
      memoInst
    );
    console.log(`# tx signature: ${destRes}`);
    assert.isNotEmpty(destRes);
  });
})
