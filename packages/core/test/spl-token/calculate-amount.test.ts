import { describe, it, expect } from '@jest/globals';
import { SplToken as Internals_SplToken } from '../../src/spl-token/calculate-amount';

describe('Internals_SplToken', () => {
  it('Calculate token amount', async () => {
    const res1 = Internals_SplToken.calculateAmount(1, 2);
    expect(res1).toEqual(100);

    const res2 = Internals_SplToken.calculateAmount(0.1, 2);
    expect(res2).toEqual(10);

    const res3 = Internals_SplToken.calculateAmount(0.1, 0);
    expect(res3).toEqual(0.1);

    const res4 = Internals_SplToken.calculateAmount(0.001, 5);
    expect(res4).toEqual(100);
  });
});
