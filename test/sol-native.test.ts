import {describe, it, before} from 'mocha';
import {SolNative} from '../src/sol-native';
import {Memo} from '../src/memo';
import {assert} from 'chai'
import {Keypair, PublicKey} from '@solana/web3.js';
import setupKeyPair from '../test/utils/setupKeyPair';

let source: Keypair;
let destPubKey: PublicKey;

describe('SolNative', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
    destPubKey = obj.dest.publicKey;
  });

  it('transfer transaction', async () => {
    const solAmount = 1;
    const res = await SolNative.transfer(
      source.publicKey,
      [source],
      destPubKey,
      solAmount,
    );
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });

  it('transfer transaction with memo data', async () => {
    const solAmount = 1;
    const instruction = Memo.createInstruction(
      '{"tokenId": "dummy", "serialNo": "15/100"}'
    );
    const res = await SolNative.transfer(
      source.publicKey,
      [source],
      destPubKey,
      solAmount,
      instruction
    );
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });
})
