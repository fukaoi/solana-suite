import {describe, it, before} from 'mocha';
import {SolNative} from '../src/sol-native';
import {Memo} from '../src/memo';
import {Wallet} from '../src/wallet';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';

let source: Wallet.KeyPair;
let destinationStr: string;

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    destinationStr = obj.dest.pubkey;
  });

  it('transfer transaction', async () => {
    const solAmount = 0.0001;
    const res = await SolNative.transfer(
      source.pubkey.toPubKey(),
      [source.secret.toKeypair()],
      destinationStr.toPubKey(),
      solAmount,
    )();
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });

  it('transfer transaction with memo data', async () => {
    const solAmount = 0.0001;
    const instruction = Memo.createInstruction(
      '{"tokenId": "dummy", "serialNo": "15/100"}'
    );
    const res = await SolNative.transfer(
      source.pubkey.toPubKey(),
      [source.secret.toKeypair()],
      destinationStr.toPubKey(),
      solAmount,
    )(instruction);
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });
})
