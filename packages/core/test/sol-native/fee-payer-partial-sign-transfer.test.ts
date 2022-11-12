import { describe, it, before } from 'mocha';
import { SolNative, KeypairStr } from '../../src';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';

let source: KeypairStr;
let dest: KeypairStr;

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('transfer feePayerPartialSign', async () => {
    const solAmount = 0.01;
    const serialized = await SolNative.feePayerPartialSignTransfer(
      source.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair()],
      solAmount,
      source.pubkey.toPublicKey()
    );

    assert.isTrue(serialized.isOk, `${serialized.unwrap()}`);
    if (serialized.isOk) {
      console.log(serialized.value);
      const res = await serialized.value.submit(source.toKeypair());
      assert.isTrue(res.isOk, `${res.unwrap()}`);
      console.log('# tx signature: ', res.unwrap());
    }
  });
});
