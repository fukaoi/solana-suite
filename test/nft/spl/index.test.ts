import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Setup} from '../../../test/utils/setup';
import {Wallet, SplNft, Memo} from '../../../src';

let source: Wallet.KeyPair;
let destination: Wallet.KeyPair;
let tokenKeyStr: string;

describe('NftSpl', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    destination = obj.dest;
  });

  it('Create nft', async () => {
    const tokenKey = await SplNft.create(source.secret.toKeypair());
    if (tokenKey.isErr) console.error(tokenKey.error);
    assert.isTrue(tokenKey.isOk);
    tokenKeyStr = tokenKey.unwrap();
    console.log(`# nft: ${tokenKeyStr}`);
  });

  it('Transfer nft with memo data, source and destination inter send', async () => {
    const memoInst = Memo.createInstruction('{"nft": "art", "url": "http://hoge.hoge"}');
    const srcRes = await SplNft.transfer(
      tokenKeyStr.toPubKey(),
      source.secret.toKeypair(),
      destination.pubkey.toPubKey(),
      memoInst
    );
    if (srcRes.isErr) console.error(srcRes.error);
    assert.isTrue(srcRes.isOk); 
    console.log(`# tx signature: ${srcRes.unwrap()}`);
  });
})
