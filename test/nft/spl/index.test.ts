import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Setup} from '../../../test/utils/setup';
import {Wallet, SplNft, Memo} from '../../../src';

let source: Wallet.KeypairStr;
let destination: Wallet.KeypairStr;
let tokenKeyStr: string;

describe('NftSpl', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    destination = obj.dest;
  });

  it('Create nft', async () => {
    const tokenKey = await SplNft.create(
      source.pubkey.toPubKey(),
      [source.secret.toKeypair()]
    );
    if (tokenKey.isErr) console.error(tokenKey.error);
    assert.isTrue(tokenKey.isOk);
    tokenKeyStr = tokenKey.unwrap();
    console.log(`# nft: ${tokenKeyStr}`);
  });

  it('Transfer nft with memo data', async () => {
    const memoInst = Memo.createInstruction(
      '{"nft": "art", "url": "http://hoge.hoge"}'
    );
    const res = await SplNft.transfer(
      tokenKeyStr.toPubKey(),
      source.pubkey.toPubKey(),
      destination.pubkey.toPubKey(),
      [source.secret.toKeypair()],
    )({
      txInstructions: [memoInst]
    });
    if (res.isErr) console.error(res.error);
    assert.isTrue(res.isOk);
    console.log(`# tx signature: ${res.unwrap()}`);
  });
})
