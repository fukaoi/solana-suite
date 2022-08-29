import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken, KeypairStr, Multisig } from '../../src/';

let source: KeypairStr;
let dest: KeypairStr;
let mintStr: string;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('Create token', async () => {
    const inst = await SplToken.mint(
      source.toPublicKey(),
      [source.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);
  });

  it('Create token with multisig', async () => {
    const signer1 = KeypairStr.create();
    const signer2 = KeypairStr.create();
    const multisigInst = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
    ]);

    assert.isTrue(multisigInst.isOk, `${multisigInst.unwrap()}`);

    const multisig = multisigInst.unwrap().data as string;

    console.log('# multisig address :', multisig);

    const inst = await SplToken.mint(
      multisig.toPublicKey(),
      [signer1.toKeypair(), signer2.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      source.toKeypair()
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const res = await [multisigInst, inst].submit();
    assert.isTrue(res.isOk, res.unwrap());
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);
  });

  it('[Err]lack signer for multisig', async () => {
    const signer1 = KeypairStr.create();
    const signer2 = KeypairStr.create();
    const multisig = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
    ]);

    const mint = await SplToken.mint(
      (multisig.unwrap().data as string).toPublicKey(),
      [source.toKeypair(), signer1.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL
    );
    const res = await [multisig, mint].submit();
    assert.isFalse(res.isOk);
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
});
