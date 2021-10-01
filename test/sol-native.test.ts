import {describe, it, before} from 'mocha';
import {SolNative} from '../src/sol-native';
import {Memo} from '../src/memo';
import {Wallet} from '../src/wallet';
import {assert} from 'chai';
import setupKeyPair from '../test/utils/setupKeyPair';

let source: Wallet.KeyPair;
let destPubkey: string;

describe('SolNative', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
    destPubkey = obj.dest.pubkey;
  });

  it('transfer transaction', async () => {
    const solAmount = 0.0001;
    const res = await SolNative.transfer(
      source.pubkey,
      [source.secret],
      destPubkey,
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
      source.pubkey,
      [source.secret],
      destPubkey,
      solAmount,
    )(instruction);
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });
})
