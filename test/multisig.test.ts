import {assert} from 'chai';
import {Multisig, Wallet} from '../src/';
import {Setup} from './utils/setup';

let source: Wallet.KeypairStr;

describe('Multisig', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Create account 2 of 2', async () => {
    const feePayer = source;
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const res = await Multisig.create(
      2,
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
      ],
      feePayer.secret.toKeypair()
    );

    if (res.isErr) console.error(res.error); 
    assert.isTrue(res.isOk);
    console.log('# multisig account: ', res.unwrap());
  });

  it('Create account 2 of 3', async () => {
    const feePayer = source;
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const signer3 = Wallet.create();
    const res = await Multisig.create(
      2,
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
        signer3.pubkey.toPubKey(),
      ],
      feePayer.secret.toKeypair()
    );

    if (res.isErr) console.error(res.error); 
    assert.isTrue(res.isOk);
    console.log('# multisig account: ', res.unwrap());
  });

  it('[Err] m number less than signers number', async () => {
    const feePayer = source;
    const signer1 = Wallet.create();
    const res = await Multisig.create(
      2,
      [
        signer1.pubkey.toPubKey(),
      ],
      feePayer.secret.toKeypair()
    );
    assert.isTrue(res.isErr);
  });
})
