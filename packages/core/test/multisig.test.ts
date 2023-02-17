import { assert } from 'chai';
import { Multisig } from '../src/';
import { Setup } from '../../shared/test/testSetup';
import { KeyPair, Pubkey } from '../../shared';

let source: KeyPair;

describe('Multisig', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Is multisig address', async () => {
    const signer1 = KeyPair.create();
    const signer2 = KeyPair.create();
    const inst = await Multisig.create(2, source.secret, [
      signer1.pubkey,
      signer2.pubkey,
    ]);

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    const res = await inst.submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    const address = inst.unwrap().data as string;
    console.log('# multisig address: ', address);
    const isAddress = await Multisig.isAddress(address);
    assert.isTrue(isAddress.isOk);
    assert.isTrue(isAddress.unwrap());
  });

  it('[Err]Invalid multisig address', async () => {
    const signer1 = KeyPair.create();
    const signer2 = KeyPair.create();
    const inst = await Multisig.create(2, source.secret, [
      signer1.pubkey,
      signer2.pubkey,
    ]);

    const address = inst.unwrap().data as string;
    const res = await Multisig.isAddress(address);
    assert.isTrue(res.isOk);
    assert.isFalse(res.unwrap());
  });

  it('Create account 2 of 2', async () => {
    const signer1 = KeyPair.create();
    const signer2 = KeyPair.create();
    const inst = await Multisig.create(2, source.secret, [
      signer1.pubkey,
      signer2.pubkey,
    ]);

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    const res = await inst.submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# multisig account: ', inst.unwrap().data);
  });

  it('Create account 2 of 3', async () => {
    const signer1 = KeyPair.create();
    const signer2 = KeyPair.create();
    const signer3 = KeyPair.create();
    const inst = await Multisig.create(2, source.secret, [
      signer1.pubkey,
      signer2.pubkey,
      signer3.pubkey,
    ]);

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    const res = await inst.submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# multisig account: ', inst.unwrap().data);
  });

  it('[Err] m number less than signers number', async () => {
    const signer1 = KeyPair.create();
    const res = await Multisig.create(2, source.secret, [signer1.pubkey]);
    assert.isTrue(res.isErr);
  });

  it('Get multisig info', async () => {
    const signer1 = KeyPair.create();
    const signer2 = KeyPair.create();
    const inst = await Multisig.create(2, source.secret, [
      signer1.pubkey,
      signer2.pubkey,
    ]);
    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    await inst.submit();
    const res = await Multisig.getInfo(inst.unwrap().data as Pubkey);
    assert.equal(res.unwrap().signer1.toString(), signer1.pubkey);
    assert.equal(res.unwrap().signer2.toString(), signer2.pubkey);
    assert.isTrue(res.isOk, `${res.unwrap()}`);
  });
});
