import {describe, it} from 'mocha';
import {Transaction, Memo, Wallet} from '../src';
import {Instruction} from '../src/instruction';
import {Setup} from '../test/utils/setup';
import {assert} from 'chai';

let source: Wallet.KeypairStr;

describe('Instruction', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Submit instructions with fee payer', async () => {
    const before = (await Wallet.getBalance(source.pubkey.toPubKey())).unwrap();
    const owner = Wallet.create();
    const instructions = [];
    instructions.push(Memo.createInstruction(
      '{"title": "Submit first instruction"}',
      [owner.pubkey.toPubKey()]
    ));
    instructions.push(Memo.createInstruction(
      '{"title": "Submit 2nd instruction"}',
      [owner.pubkey.toPubKey()]
    ));
    const res =
      await Instruction.submit(
        instructions,       
        [
          owner.secret.toKeypair(),
        ],
        source.secret.toKeypair(),
      );
      

    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
    const after = (await Wallet.getBalance(source.pubkey.toPubKey())).unwrap();
    assert.isTrue(before > after, `before fee: ${before}, after fee: ${after}`);
  });
})
