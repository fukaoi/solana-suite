import {describe, it} from 'mocha';
import {Transaction} from '../src/transaction';
import {assert, expect} from 'chai';

describe('Transaction', () => {
  it('Get transaction data from user pubkey', async () => {
    await Transaction.get('7hy48Kc9BZEet6CXkCNHhmqhNCgNRiJ96Mwii9JUREsc');
  });
})
