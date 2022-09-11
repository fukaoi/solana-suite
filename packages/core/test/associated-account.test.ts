import { describe, it } from 'mocha';
import { assert } from 'chai';
import { AssociatedAccount } from '../src/associated-account';
import { KeypairStr, SplToken } from '../src';
import { Setup } from '@solana-suite/shared/test/testSetup';

let source: KeypairStr;

describe('AssociatedAccount', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Retry getOrCreate', async () => {
    const mintInst = await SplToken.mint(
      source.toPublicKey(),
      [source.toKeypair()],
      10000,
      1
    );

    await mintInst.submit();

    assert.isTrue(mintInst.isOk, `${mintInst.unwrap()}`);
    const mint = mintInst.unwrap().data as string;

    const res = await AssociatedAccount.retryGetOrCreate(
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

  it('Get associatedToken account', async () => {
    const mint = 'F3U1c11w8RFxkrwxLFbNB4jarcNmTiXxCdGWHu4CVrr3'.toPublicKey();
    const owner = '83hSrAsWFYdhrqW77evWJb1yzVxyNhXk3CnrAJWEd1qm'.toPublicKey();
    const expected = '2QSBPixtfHP2JGYfwGaxeLYji9F4NfemCvCJCXe5kMdt';
    const res = await AssociatedAccount.get(mint, owner, source.toKeypair());

    res.match(
      (ok) => assert.equal(ok, expected),
      (err) => assert.fail(err.message)
    );
  });

  it('Create associatedToken account', async () => {
    const mint = 'F3U1c11w8RFxkrwxLFbNB4jarcNmTiXxCdGWHu4CVrr3'.toPublicKey();
    const owner = KeypairStr.create();
    const inst = await AssociatedAccount.get(
      mint,
      owner.toPublicKey(),
      source.toKeypair()
    );

    const res = await inst.submit();

    res.match(
      (ok) => console.log('# sig: ', ok, '# tokenAccount: ', inst.unwrap()),
      (err) => assert.fail(err.message)
    );
  });
});
