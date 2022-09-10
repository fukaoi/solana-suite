import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Internals_SplToken } from '../../src/internals/_spl-token';

describe('Internals_SplToken', () => {
  it('find token address', async () => {
    const res = await Internals_SplToken.findAssociatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPublicKey(),
      '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS'.toPublicKey()
    );
    assert.isTrue(res.isOk);
    assert.isNotNull(res.unwrap());
  });

  it('Calculate token amount', async () => {
    const res1 = Internals_SplToken.calculateAmount(1, 2);
    assert.equal(res1, 100);

    const res2 = Internals_SplToken.calculateAmount(0.1, 2);
    assert.equal(res2, 10);

    const res3 = Internals_SplToken.calculateAmount(0.1, 0);
    assert.equal(res3, 0.1);

    const res4 = Internals_SplToken.calculateAmount(0.001, 5);
    assert.equal(res4, 100);
  });
});
