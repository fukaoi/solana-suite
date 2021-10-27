import {describe, it, before} from 'mocha';
import {SolNative, Memo, Wallet} from '../src';
import {assert} from 'chai';
import {Setup} from '../test/utils/setup';

let source: Wallet.KeypairStr;
let destinationStr: string;

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    destinationStr = obj.dest.pubkey;
  });

  it('transfer transaction', async () => {
    const solAmount = 0.0001;
    const res =
      await SolNative.transfer(
        source.pubkey.toPubKey(),
        destinationStr.toPubKey(),
        solAmount,
      )({signers: [source.secret.toKeypair()]});

    if (res.isErr) console.error(res.error);
    assert.isNotTrue(res.isErr);
    console.log('# tx signature: ', res.unwrap());
  });

  it('transfer transaction with memo data', async () => {
    const solAmount = 0.0001;
    const instruction = Memo.createInstruction(
      '{"tokenId": "dummy", "serialNo": "15/100"}'
    );
    const res = await SolNative.transfer(
      source.pubkey.toPubKey(),
      destinationStr.toPubKey(),
      solAmount,
    )({
      signers: [source.secret.toKeypair()],
      txInstructions: [instruction]
    });
    if (res.isErr) console.error(res.error);
    assert.isNotTrue(res.isErr);
    console.log('# tx signature: ', res.unwrap());
  });
})
