import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken, KeypairStr, Multisig } from '../../src/';
import { PublicKey } from '@solana/web3.js';

let source: KeypairStr;
let dest: KeypairStr;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('Create token, batch transfer', async () => {
    const inst1 = await SplToken.mint(
      source.toPublicKey(),
      [source.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL
    );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
    const token = inst1.unwrap().data as string;
    console.log('# mint: ', token);

    const inst2 = await SplToken.transfer(
      token.toPublicKey(),
      source.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair()],
      1,
      MINT_DECIMAL,
      source.toKeypair()
    );
    assert.isTrue(inst1.isOk);

    const inst3 = await SplToken.transfer(
      token.toPublicKey(),
      source.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair()],
      1,
      MINT_DECIMAL,
      source.toKeypair()
    );
    assert.isTrue(inst2.isOk);

    const sig = await [inst1, inst2, inst3].submit();

    assert.isTrue(sig.isOk, sig.unwrap());
    console.log('signature: ', sig.unwrap());
  });

  it('Create token, transfer with multisig and fee payer', async () => {
    // create multisig
    const signer1 = KeypairStr.create();
    const signer2 = KeypairStr.create();
    const multiInst = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
    ]);

    let multisig!: PublicKey;

    (await multiInst.submit()).match(
      (_) => (multisig = (multiInst.unwrap().data as string).toPublicKey()),
      (err) => assert.fail(err.message)
    );

    console.log('# signer1 address :', signer1.pubkey);
    console.log('# signer2 address :', signer2.pubkey);
    console.log('# multisig address :', multisig.toBase58());

    const mintInst = await SplToken.mint(
      multisig,
      [source.toKeypair(), signer1.toKeypair(), signer2.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      source.toKeypair()
    );

    let token!: PublicKey;

    (await mintInst.submit()).match(
      (_) => (token = (mintInst.unwrap().data as string).toPublicKey()),
      (err) => assert.fail(err.message)
    );

    console.log('# mint: ', token.toBase58());

    const inst = await SplToken.transfer(
      token,
      multisig,
      dest.toPublicKey(),
      [signer1.toKeypair(), signer2.toKeypair()],
      1,
      MINT_DECIMAL,
      source.toKeypair()
    );

    (await inst.submit()).match(
      (ok) => console.log('signature: ', ok),
      (err) => assert.fail(err.message)
    );
  });

  it('transfer feePayerPartialSign', async () => {
    const tokenOwner = KeypairStr.create();
    const receipt = KeypairStr.create();
    console.log('# tokenOwner: ', tokenOwner.pubkey);
    console.log('# receipt: ', receipt.pubkey);

    const inst1 = await SplToken.mint(
      tokenOwner.toPublicKey(),
      [tokenOwner.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      source.toKeypair()
    );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
    await inst1.submit();
    const token = inst1.unwrap().data as string;
    console.log('# mint: ', token);

    const serialized = await SplToken.feePayerPartialSignTransfer(
      token.toPublicKey(),
      tokenOwner.toPublicKey(),
      receipt.toPublicKey(),
      [tokenOwner.toKeypair()],
      100,
      MINT_DECIMAL,
      source.toPublicKey()
    );

    assert.isTrue(serialized.isOk, `${serialized.unwrap()}`);

    if (serialized.isOk) {
      const res = await serialized.value.submit(source.toKeypair());
      assert.isTrue(res.isOk, `${res.unwrap()}`);
      console.log('# tx signature: ', res.unwrap());
    }
  });
});
