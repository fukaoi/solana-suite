import {describe, it} from 'mocha';
import {Memo, Wallet, Instruction} from '../src';
import {Setup} from '../test/utils/setup';
import {assert} from 'chai';

let source: Wallet.KeypairStr;

describe('Instruction', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Submit instruction with fee payer', async () => {
    const before = (await Wallet.getBalance(source.pubkey.toPubKey())).unwrap();
    const owner = Wallet.create();
    const feePayer = source.secret.toKeypair();
    const instruction = new Instruction(
      [Memo.createInstruction(
        '{"title": "Submit first instruction"}',
        [owner.pubkey.toPubKey()]
      )],
      [owner.secret.toKeypair()],
      feePayer
    );

    const res = await instruction.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
    const after = (await Wallet.getBalance(source.pubkey.toPubKey())).unwrap();
    assert.isTrue(before > after, `before fee: ${before}, after fee: ${after}`);
  });

  it('Submit batch instructions with fee payer', async () => {
    const before = (await Wallet.getBalance(source.pubkey.toPubKey())).unwrap();
    const owner = Wallet.create();
    const feePayer = source.secret.toKeypair();
    const instruction1 = new Instruction(
      [Memo.createInstruction(
        '{"title": "Submit first instruction"}',
        [owner.pubkey.toPubKey()]
      )],
      [owner.secret.toKeypair()],
    );

    const instruction2 = new Instruction(
      [Memo.createInstruction(
        '{"title": "Submit first instruction"}',
        [owner.pubkey.toPubKey()]
      )],
      [owner.secret.toKeypair()],
      feePayer
    );

    const instructions = [instruction1, instruction2];
    const res = await Instruction.batchSubmit(instructions);
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
    const after = (await Wallet.getBalance(source.pubkey.toPubKey())).unwrap();
    assert.isTrue(before > after, `before fee: ${before}, after fee: ${after}`);
  });

})
