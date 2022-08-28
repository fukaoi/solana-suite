import { assert } from 'chai';
import { Multisig, KeypairStr } from '../src/';
import { Setup } from '../../shared/test/testSetup';

let source: KeypairStr;

describe('Multisig', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Is multisig address', async () => {
    const signer1 = KeypairStr.create();
    const signer2 = KeypairStr.create();
    const inst = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
    ]);

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    const res = await inst.submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    const address = inst.unwrap().data as string;
    console.log('# multisig address: ', address);
    const isAddress = await Multisig.isAddress(address.toPublicKey());
    assert.isTrue(isAddress.isOk);
    assert.isTrue(isAddress.unwrap());
  });

  it('[Err]Invalid multisig address', async () => {
    const signer1 = KeypairStr.create();
    const signer2 = KeypairStr.create();
    const inst = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
    ]);

    const address = inst.unwrap().data as string;
    const res = await Multisig.isAddress(address.toPublicKey());
    assert.isTrue(res.isOk);
    assert.isFalse(res.unwrap());
  });

  it('Create account 2 of 2', async () => {
    const signer1 = KeypairStr.create();
    const signer2 = KeypairStr.create();
    const inst = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
    ]);

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    const res = await inst.submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# multisig account: ', inst.unwrap().data);
  });

  it('Create account 2 of 3', async () => {
    const signer1 = KeypairStr.create();
    const signer2 = KeypairStr.create();
    const signer3 = KeypairStr.create();
    const inst = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
      signer3.toPublicKey(),
    ]);

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    const res = await inst.submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# multisig account: ', inst.unwrap().data);
  });

  it('[Err] m number less than signers number', async () => {
    const signer1 = KeypairStr.create();
    const res = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
    ]);
    assert.isTrue(res.isErr);
  });

  it('Get multisig info', async () => {
    const signer1 = KeypairStr.create();
    const signer2 = KeypairStr.create();
    const inst = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
    ]);
    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    await inst.submit();
    const res = await Multisig.getMultisigInfo(
      (inst.unwrap().data as string).toPublicKey()
    );
    assert.equal(res.unwrap().signer1.toString(), signer1.pubkey);
    assert.equal(res.unwrap().signer2.toString(), signer2.pubkey);
    assert.isTrue(res.isOk, `${res.unwrap()}`);
  });
});
