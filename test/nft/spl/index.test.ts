import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Setup} from '../../../test/utils/setup';
import {Wallet, SplNft, Memo} from '../../../src';

let source: Wallet.KeyPair;
let destination: Wallet.KeyPair;

describe('NftSpl', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    destination = obj.dest;
  });

  it('Create nft', async () => {
    const tokenKey = await SplNft.create(source.secret.toKeypair());
    console.log(`# nft: ${tokenKey}`);
    assert.isNotEmpty(tokenKey);
  });

  it('Transfer nft with memo data, source and destination inter send', async () => {
    const tokenKey = await SplNft.create(source.secret.toKeypair());
    const memoInst = Memo.createInstruction('{"nft": "art", "url": "http://hoge.hoge"}');
    const srcRes = await SplNft.transfer(
      tokenKey.toPubKey(),
      source.secret.toKeypair(),
      destination.pubkey.toPubKey(),
      memoInst
    );
    console.log(`# tx signature: ${srcRes}`);
    assert.isNotEmpty(srcRes);
  });
})
