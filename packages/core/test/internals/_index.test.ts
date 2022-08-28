import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Internals } from '../../src/internals/_index';
import { KeypairStr, SplToken } from '../../src';
import { Setup } from '@solana-suite/shared/test/testSetup';

let source: KeypairStr;

describe('Internals_SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Retry getOrCreateAssociatedAccountInfo', async () => {
    const mintInst = await SplToken.mint(
      source.toPublicKey(),
      [source.toKeypair()],
      10000,
      1
    );

    await mintInst.submit();

    assert.isTrue(mintInst.isOk, `${mintInst.unwrap()}`);
    const mint = mintInst.unwrap().data as string;

    const res = await Internals.retryGetOrCreateAssociatedAccountInfo(
      mint.toPublicKey(),
      source.toPublicKey(),
      source.toKeypair()
    );

    res.match(
      (ok) => {
        console.log('# associated token account: ', ok);
        assert.isString(ok);
      },
      (err) => assert.fail(err.message)
    );
  });
});
