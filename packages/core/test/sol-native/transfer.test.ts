import { describe, it, before } from 'mocha';
import { SolNative, Multisig, KeypairStr, Airdrop } from '../../src';
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
    const inst = await SolNative.transfer(
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

  it('transfer feePayerPartialSign', async () => {
    const solAmount = 0.01;
    const serialized = await SolNative.feePayerPartialSignTransfer(
      source.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair()],
      solAmount,
      source.pubkey.toPublicKey()
    );

    assert.isTrue(serialized.isOk, `${serialized.unwrap()}`);
    if (serialized.isOk) {
      console.log(serialized.value);
      const res = await serialized.value.submit(source.toKeypair());
      assert.isTrue(res.isOk, `${res.unwrap()}`);
      console.log('# tx signature: ', res.unwrap());
    }
  });

  it('transfer transaction with fee payer', async () => {
    const solAmount = 0.01;
    const owner = KeypairStr.create();
    await Airdrop.request(owner.toPublicKey());
    const feePayer = source;

    const before = (
      await SolNative.findByOwner(feePayer.pubkey.toPublicKey())
    ).unwrap();

    console.log(before);

    const inst = await SolNative.transfer(
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

  it('transfer transaction with multi sig', async () => {
    const signer1 = KeypairStr.create();
    const signer2 = KeypairStr.create();
    const inst1 = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
    ]);

    let multisig!: string;

    (await inst1.submit()).match(
      (_) => {
        multisig = inst1.unwrap().data as string;
        console.log('# multisig: ', multisig);
      },
      (err) => assert.fail(err.message)
    );

    const inst2 = await SolNative.transferWithMultisig(
      multisig.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair(), signer1.toKeypair(), signer2.toKeypair()],
      0.01,
      source.toKeypair()
    );

    (await inst2.submit()).match(
      (sig) => console.log('# signature: ', sig),
      (err) => assert.fail(err.message)
    );
  });
});
