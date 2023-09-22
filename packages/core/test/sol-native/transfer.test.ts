import { describe, it, before } from 'mocha';
import { SolNative, Airdrop } from '../../src';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { KeypairAccount } from '../../../shared/src/keypair-account';

let source: KeypairAccount;
let dest: KeypairAccount;

describe('SolNative', () => {
  before(async () => {
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
      feePayer.secret
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# tx signature: ', res.unwrap());
    const after = (await SolNative.findByOwner(feePayer.pubkey)).unwrap();
    assert.isTrue(
      before.sol > after.sol,
      `before fee: ${before}, after fee: ${after}`
    );
  });
});
