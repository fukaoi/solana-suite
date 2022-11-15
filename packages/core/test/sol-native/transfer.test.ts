import { describe, it, before } from 'mocha';
import { SolNative, KeypairStr, Airdrop } from '../../src';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';

let source: KeypairStr;
let dest: KeypairStr;

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('transfer transaction', async () => {
    const solAmount = 0.01;
    const inst = SolNative.transfer(
      source.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair()],
      solAmount
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    const res = await inst.submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# tx signature: ', res.unwrap());
  });

  // every call requestAirdrop(), raise internal error
  it.skip('transfer transaction with fee payer', async () => {
    const solAmount = 0.01;
    const owner = KeypairStr.create();
    await Airdrop.request(owner.toPublicKey());
    const feePayer = source;

    const before = (
      await SolNative.findByOwner(feePayer.pubkey.toPublicKey())
    ).unwrap();

    console.log(before);

    const inst = SolNative.transfer(
      owner.toPublicKey(),
      dest.toPublicKey(),
      [owner.toKeypair()],
      solAmount,
      feePayer.toKeypair()
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# tx signature: ', res.unwrap());
    const after = (
      await SolNative.findByOwner(feePayer.pubkey.toPublicKey())
    ).unwrap();
    assert.isTrue(
      before.sol > after.sol,
      `before fee: ${before}, after fee: ${after}`
    );
  });
});
