import test from 'ava';
import { SplToken as Internals_SplToken } from '../src/calculate-amount';

test('Calculate token amount', (t) => {
  const res1 = Internals_SplToken.calculateAmount(1, 2);
  t.is(res1, 100);

  const res2 = Internals_SplToken.calculateAmount(0.1, 2);
  t.is(res2, 10);

  const res3 = Internals_SplToken.calculateAmount(0.1, 0);
  t.is(res3, 0.1);

  const res4 = Internals_SplToken.calculateAmount(0.001, 5);
  t.is(res4, 100);
});
