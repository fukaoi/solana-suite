import {describe, it} from 'mocha';
import {Memo} from '../../../src/memo';
import {assert} from 'chai'
import setupKeyPair from '../../../test/utils/setupKeyPair';
import fs from 'fs';
import {Wallet} from '../../../src/wallet';
import {SplNft} from '../../../src/nft/spl/spl-nft';

let source: Wallet.Keypair;
let dest: Wallet.Keypair;
let destPubkey: string;
let nft: string;

const TEMP_NFT_FILE = '.solana-nft-token';

const loadNftTempFile = () => {
  const res = fs.readFileSync(TEMP_NFT_FILE, 'utf8');
  if (res) {
    const obj = JSON.parse(res);
    nft = obj.nft;
  }
  console.log(`# nft: ${nft}`);
}

const createNftTempFile = async (data: Object) => {
  fs.writeFileSync(TEMP_NFT_FILE, JSON.stringify(data));
}

describe('NftSpl', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
    dest = obj.dest;
    destPubkey = obj.dest.pubkey;
    fs.existsSync(TEMP_NFT_FILE) && loadNftTempFile();
  });

  it('Create nft', async () => {
    if (nft) {
      console.log(`# skip because loaded`);
      return;
    }
    const res = await SplNft.createNft(source.secret);
    console.log(`# nft: ${res.tokenId}`);
    nft = res.tokenId;
    assert.isObject(res);
    createNftTempFile({nft: nft});
  });

  it('Transfer nft, source and destination inter send', async () => {
    const srcRes = await SplNft.transferNft(nft, source.secret, destPubkey);
    console.log(`# tx signature: ${srcRes}`);
    assert.isNotEmpty(srcRes);
    const destRes = await SplNft.transferNft(nft, dest.secret, source.pubkey);
    console.log(`# tx signature: ${destRes}`);
    assert.isNotEmpty(destRes);
  });

  it('Transfer nft with memo data, source and destination inter send', async () => {
    const memoInst = Memo.createInstruction('{"nft": "art", "url": "http://hoge.hoge"}');
    const srcRes = await SplNft.transferNft(nft, source.secret, destPubkey, memoInst);
    console.log(`# tx signature: ${srcRes}`);
    assert.isNotEmpty(srcRes);
    const destRes = await SplNft.transferNft(nft, dest.secret, source.pubkey, memoInst);
    console.log(`# tx signature: ${destRes}`);
    assert.isNotEmpty(destRes);
  });
})
