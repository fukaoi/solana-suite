import { beforeAll, describe, expect, it } from '@jest/globals';
import { Setup } from '../../../shared/test/testSetup';
import { KeypairAccount } from '../../../shared/src/keypair-account';
import { SolNative } from '../../src/';

let source: KeypairAccount;
let dest: KeypairAccount;

describe('SolNative', () => {
  beforeAll(async () => {
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
      source.pubkey,
    );

    expect(serialized.isOk).toBe(true);
    if (serialized.isOk) {
      console.log(serialized.value);
      const res = await serialized.value.submit(source.secret);
      expect(res.isOk).toBe(true);
      console.log('# tx signature: ', res.unwrap());
    }
  });
});
