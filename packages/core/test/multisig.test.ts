import { describe, it, expect, beforeAll } from '@jest/globals';
import { Multisig } from '../src/';
import { Setup } from '../../shared/test/testSetup';
import { KeypairAccount, Pubkey } from '../../shared';

let source: KeypairAccount;
let dest: KeypairAccount;

describe('Multisig', () => {
  beforeAll(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('Is multisig address', async () => {
    const signer1 = KeypairAccount.create();
    const signer2 = KeypairAccount.create();
    const inst = await Multisig.create(2, source.secret, [
      signer1.pubkey,
      signer2.pubkey,
    ]);

    expect(inst.isOk).toBe(true);
    const res = await inst.submit();
    expect(res.isOk).toBe(true);
    const address = inst.unwrap().data as string;
    console.log('# multisig address: ', address);
    const isAddress = await Multisig.isAddress(address);
    expect(isAddress.isOk).toBe(true);
    expect(isAddress.unwrap()).toBe(true);
  });

  it('[Err]Invalid multisig address', async () => {
    const signer1 = KeypairAccount.create();
    const signer2 = KeypairAccount.create();
    const inst = await Multisig.create(2, source.secret, [
      signer1.pubkey,
      signer2.pubkey,
    ]);

    const address = inst.unwrap().data as string;
    const res = await Multisig.isAddress(address);
    expect(res.isOk).toBe(true);
    expect(res.unwrap()).toBe(false);
  });

  it('Create account 2 of 2', async () => {
    const signer1 = KeypairAccount.create();
    const signer2 = KeypairAccount.create();
    const inst = await Multisig.create(2, dest.secret, [
      signer1.pubkey,
      signer2.pubkey,
    ]);

    expect(inst.isOk).toBe(true);
    const res = await inst.submit();
    expect(res.isOk).toBe(true);
    console.log('# multisig account: ', inst.unwrap().data);
  });

  it('Create account 2 of 3', async () => {
    const signer1 = KeypairAccount.create();
    const signer2 = KeypairAccount.create();
    const signer3 = KeypairAccount.create();
    const inst = await Multisig.create(2, source.secret, [
      signer1.pubkey,
      signer2.pubkey,
      signer3.pubkey,
    ]);

    expect(inst.isOk).toBe(true);
    const res = await inst.submit();
    expect(res.isOk).toBe(true);
    console.log('# multisig account: ', inst.unwrap().data);
  });

  it('[Err] m number less than signers number', async () => {
    const signer1 = KeypairAccount.create();
    const res = await Multisig.create(2, source.secret, [signer1.pubkey]);
    expect(res.isErr).toBe(true);
  });

  it('Get multisig info', async () => {
    const signer1 = KeypairAccount.create();
    const signer2 = KeypairAccount.create();
    const inst = await Multisig.create(2, source.secret, [
      signer1.pubkey,
      signer2.pubkey,
    ]);
    expect(inst.isOk).toBe(true);
    await inst.submit();
    const res = await Multisig.getInfo(inst.unwrap().data as Pubkey);
    expect(res.unwrap().signer1.toString()).toEqual(signer1.pubkey);
    expect(res.unwrap().signer2.toString()).toEqual(signer2.pubkey);
    expect(res.isOk).toBe(true);
  });
});
