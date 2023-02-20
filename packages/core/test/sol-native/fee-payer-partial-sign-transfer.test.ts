import { describe, it, before } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { KeyPair } from '../../../shared/src/key-pair';
import { SolNative } from '../../src/';

let source: KeyPair;
let dest: KeyPair;

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('transfer feePayerPartialSign', async () => {
    const solAmount = 0.01;
    const serialized = await SolNative.feePayerPartialSignTransfer(
      source.pubkey,
      dest.pubkey,
      [source.secret],
      solAmount,
      source.pubkey
    );

    assert.isTrue(serialized.isOk, `${serialized.unwrap()}`);
    if (serialized.isOk) {
      console.log(serialized.value);
      const res = await serialized.value.submit(source.secret);
      assert.isTrue(res.isOk, `${res.unwrap()}`);
      console.log('# tx signature: ', res.unwrap());
    }
  });
});
