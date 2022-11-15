import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken, KeypairStr } from '../../src/';

let source: KeypairStr;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
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
