import test from 'ava';
import { MintTransaction, PartialSignTransaction, Transaction } from '../src/';

test('class Transaction', async (t) => {
  t.true(Transaction.name === 'Transaction');
});

test('class MintTransaction', async (t) => {
  t.true(MintTransaction.name === 'MintTransaction');
});

test('class PartialSignTransaction', async (t) => {
  t.true(PartialSignTransaction.name === 'PartialSignTransaction');
});
