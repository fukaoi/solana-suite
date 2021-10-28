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
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const res = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
      ],
    )({
      feePayer: source.pubkey.toPubKey()
    });

    if (res.isErr) console.error(res.error);
    assert.isTrue(res.isOk);
    console.log('# multisig account: ', res.unwrap());
  });

  it('Create account 2 of 3', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const signer3 = Wallet.create();
    const res = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
        signer3.pubkey.toPubKey(),
      ],
    )({
      feePayer: source.pubkey.toPubKey()
    });

    if (res.isErr) console.error(res.error);
    assert.isTrue(res.isOk);
    console.log('# multisig account: ', res.unwrap());
  });

  it('[Err] m number less than signers number', async () => {
    const signer1 = Wallet.create();
    const res = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
      ],
    )();
    assert.isTrue(res.isErr);
  });

  it('Get multisig info', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const account = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
      ],
    )();
    if (account.isErr) console.error(account.error);
    const res = await Multisig.getMultisigInfo(
      account.unwrap().toPubKey()
    );
    if (res.isErr) console.error(res.error);
    assert.isTrue(res.isOk);
    console.log(res.unwrap());
  });
})
