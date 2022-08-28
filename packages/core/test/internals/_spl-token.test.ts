import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Internals_SplToken } from '../../src/internals/_spl-token';
import { KeypairStr } from '../../src';
import {Setup} from '@solana-suite/shared/test/testSetup';

let source: KeypairStr;

describe('Internals_SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('find token address', async () => {
    const res = await Internals_SplToken.findAssociatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPublicKey(),
      '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS'.toPublicKey()
    );
    assert.isTrue(res.isOk);
    assert.isNotNull(res.unwrap());
  });

  it('Get associatedToken account', async () => {
    const mint = 'F3U1c11w8RFxkrwxLFbNB4jarcNmTiXxCdGWHu4CVrr3'.toPublicKey();
    const owner = '83hSrAsWFYdhrqW77evWJb1yzVxyNhXk3CnrAJWEd1qm'.toPublicKey();
    const expected = '2QSBPixtfHP2JGYfwGaxeLYji9F4NfemCvCJCXe5kMdt';
    const res = await Internals_SplToken.getOrCreateAssociatedTokenAccount(
      mint,
      owner,
      source.toKeypair()
    );

    res.match(
      (ok) => assert.equal(ok, expected),
      (err) => assert.fail(err.message)
    );
  });

  it('Create associatedToken account', async () => {
    const mint = 'F3U1c11w8RFxkrwxLFbNB4jarcNmTiXxCdGWHu4CVrr3'.toPublicKey();
    const owner = KeypairStr.create();
    const inst = await Internals_SplToken.getOrCreateAssociatedTokenAccount(
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
