import { describe, it } from 'mocha';
import { assert } from 'chai';
import { SplToken as Internals_SplToken } from '../../src/spl-token/calculate-amount' 

describe('Internals_SplToken', () => {
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
