import {Keypair} from '@solana/web3.js';
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

  it('[Err]No match fee payer address and keypair', async () => {
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
    assert.isTrue(account.isOk, account.unwrap())
    const res = await Append.isInMultisig(
      account.unwrap().toPubKey(),
      [
        signer1.secret.toKeypair(),
        signer2.secret.toKeypair()
      ]
    );
    assert.isTrue(res.isOk, res.unwrap().toString());
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
    assert.isTrue(account.isOk, account.unwrap());
    const res = await Append.isInMultisig(
      account.unwrap().toPubKey(),
      [
        signer1.secret.toKeypair(),
        signer3.secret.toKeypair(),
      ]
    );
    assert.isTrue(res.isOk, res.unwrap().toString());
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
    assert.isOk(account.isOk, account.unwrap());
    const res = await Append.isInMultisig(
      account.unwrap().toPubKey(),
      [
        signer1.secret.toKeypair(),
      ]
    );
    assert.isFalse(res.unwrap());
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
    assert.isOk(account.isOk, account.unwrap());
    const res = await Append.isInMultisig(
      account.unwrap().toPubKey(),
      [
        other1.secret.toKeypair(),
        other2.secret.toKeypair(),
      ]
    );
    assert.isFalse(res.unwrap());
  });

  it('Extract only signer keypair', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const signer3 = Wallet.create();
    const signer4 = Wallet.create();
    const feePayer = Wallet.create();

    const multisig = await Multisig.create(2, source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
      ]
    )();

    assert.isTrue(multisig.isOk, multisig.unwrap());

    const signers =
      [
        feePayer.secret.toKeypair(),
        signer1.secret.toKeypair(),
        signer2.secret.toKeypair(),
        signer3.secret.toKeypair(),
        signer4.secret.toKeypair(),
      ];

    const res = await Append.extractOnlySignerKeypair(
      signers,
      feePayer.pubkey.toPubKey(),
      multisig.unwrap().toPubKey(),
    );
    assert.isTrue(res.isOk, res.unwrap().toString());
    assert.deepEqual(
      res.unwrap(),
      [
        signer3.secret.toKeypair(),
        signer4.secret.toKeypair(),
      ]
    );
  });

  it('[Err]Extract only signer, but empty keypair', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const feePayer = Wallet.create();

    const multisig = await Multisig.create(2, source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
      ]
    )();

    assert.isTrue(multisig.isOk, multisig.unwrap());

    const signers =
      [
        feePayer.secret.toKeypair(),
        signer1.secret.toKeypair(),
        signer2.secret.toKeypair(),
      ];

    const res = await Append.extractOnlySignerKeypair(
      signers,
      feePayer.pubkey.toPubKey(),
      multisig.unwrap().toPubKey(),
    );
    assert.isFalse(res.isOk);
  });

  it('Extract only signer, no fee payer and no multisig', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();

    const signers =
      [
        signer1.secret.toKeypair(),
        signer2.secret.toKeypair(),
      ];

    const res = await Append.extractOnlySignerKeypair(
      signers,
    );
    assert.isTrue(res.isOk);
    assert.deepEqual(res.unwrap(), signers);
  });

  it('Extract multisig keypair', async () => {
    const signer1 = Wallet.create();
    const signer2 = Wallet.create();
    const dummy = Wallet.create();
    const multisig = await Multisig.create(2, source.secret.toKeypair(),
      [
        signer1.pubkey.toPubKey(),
        signer2.pubkey.toPubKey(),
      ]
    )();
    assert.isTrue(multisig.isOk, multisig.unwrap());
    const signers =
      [
        signer1.secret.toKeypair(),
        signer2.secret.toKeypair(),
        dummy.secret.toKeypair(),
      ];

    const res = await Append.extractMultiSigKeypair(
      signers,
      multisig.unwrap().toPubKey(),
    );
    assert.isTrue(res.isOk, res.unwrap().toString());
    const actual = (res.unwrap() as Keypair[]).map(r => r.publicKey.toBase58());
    const expect =
      [
        signer1.pubkey,
        signer2.pubkey
      ];
    assert.deepEqual(actual, expect);
  })
})
