import { expect, beforeAll, describe, it } from '@jest/globals';
import { Airdrop, SolNative } from '../../src';
import { Setup } from '../../../shared/test/testSetup';
import { KeypairAccount } from '../../../shared/src/keypair-account';

let source: KeypairAccount;
let dest: KeypairAccount;

describe('SolNative', () => {
  beforeAll(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('transfer transaction', async () => {
    const solAmount = 0.01;
    const inst = SolNative.transfer(
      source.pubkey,
      dest.pubkey,
      [source.secret],
      solAmount,
    );

    expect(inst.isOk).toBe(true);
    const res = await inst.submit();
    expect(res.isOk).toBe(true);
    console.log('# tx signature: ', res.unwrap());
  });

  // every call requestAirdrop(), raise internal error
  it.skip('transfer transaction with fee payer', async () => {
    const solAmount = 0.01;
    const owner = KeypairAccount.create();
    await Airdrop.request(owner.pubkey);
    const feePayer = source;

    const before = (await SolNative.findByOwner(feePayer.pubkey)).unwrap();

    console.log(before);

    const inst = SolNative.transfer(
      owner.pubkey,
      dest.pubkey,
      [owner.secret],
      solAmount,
      feePayer.secret,
    );

    const res = await inst.submit();
    expect(res.isOk).toBe(true);
    console.log('# tx signature: ', res.unwrap());
    const after = (await SolNative.findByOwner(feePayer.pubkey)).unwrap();
    expect(before.sol > after.sol).toBe(true);
  });
});
