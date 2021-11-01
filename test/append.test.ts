import {assert} from 'chai';
import {Append, Wallet, Multisig} from '../src/';
import {Setup} from './utils/setup';

let source: Wallet.KeypairStr;

describe('Append', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Is in fee payer', async () => {
    const feePayer = Wallet.create();
    const res = Append.isInFeePayer(
      feePayer.pubkey.toPubKey(),
      [feePayer.secret.toKeypair()]
    );
    assert.isTrue(res);
  });

  it('[Err]No match fee payer address and keypari', async () => {
    const feePayer = Wallet.create();
    const other = Wallet.create();
    const res = Append.isInFeePayer(
      feePayer.pubkey.toPubKey(),
      [other.secret.toKeypair()]
    );
    assert.isFalse(res);
  });

  it('Is in multiSig', async () => {
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
    const res = await Append.isInMultisig(
      account.unwrap().toPubKey(),
      [
        signer1.secret.toKeypair(),
        signer2.secret.toKeypair()
      ]
    );
    if (res.isErr) console.error(res.error);
    assert.isTrue(res.isOk);
  });

  it('Is in multiSig m of n', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const signer3 = Wallet.create();
    const account = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
        signer3.pubkey.toPubKey(),
      ],
    )();
    if (account.isErr) console.error(account.error);
    const res = await Append.isInMultisig(
      account.unwrap().toPubKey(),
      [
        signer1.secret.toKeypair(),
        signer3.secret.toKeypair(),
      ]
    );
    if (res.isErr) console.error(res.error);
    assert.isTrue(res.unwrap());
  });

  it('[Err]keypair for signing is too less', async () => {
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
    const res = await Append.isInMultisig(
      account.unwrap().toPubKey(),
      [
        signer1.secret.toKeypair(),
      ]
    );
    assert.isTrue(res.isErr);
  });

  it('[Err]No match request address and registed address', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const other1 = Wallet.create();
    const other2 = Wallet.create();
    const account = await Multisig.create(
      2,
      source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
      ],
    )();
    if (account.isErr) console.error(account.error);
    const res = await Append.isInMultisig(
      account.unwrap().toPubKey(),
      [
        other1.secret.toKeypair(),
        other2.secret.toKeypair(),
      ]
    );
    if (res.isErr) console.error(res.error);
    assert.isFalse(res.unwrap());
  });
})
