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
    const inst = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
      ],
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    const res = await inst.unwrap().submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# multisig account: ', inst.unwrap().value);
  });

  it('Create account 2 of 3', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const signer3 = Wallet.create();
    const inst = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
        signer3.pubkey.toPubKey(),
      ],
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    const res = await inst.unwrap().submit();
    assert.isTrue(res.isOk, `${res.unwrap()}`);
    console.log('# multisig account: ', inst.unwrap().value);
  });

  it('[Err] m number less than signers number', async () => {
    const signer1 = Wallet.create();
    const res = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
      ],
    );
    assert.isTrue(res.isErr);
  });

  it('Get multisig info', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const inst = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
      ],
    );
    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    await inst.unwrap().submit();
    const res = await Multisig.getMultisigInfo((inst.unwrap().value as string).toPubKey());
    assert.isTrue(res.isOk, `${res.unwrap()}`);
  });
})
