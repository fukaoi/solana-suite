import { describe, it } from 'mocha';
import { Signatures } from '../src/signatures';
import { assert } from 'chai';
import { FilterType } from '../src/';
import { Setup } from '../../shared/test/testSetup';
import { Pubkey } from '../../shared/src';
import { TransactionFilter } from '../src/transaction-filter';

let target: Pubkey;

describe('TransactionFilter', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    target = obj.source.pubkey;
  });

  it('Parse transfer history', async () => {
    const transactions = await Signatures.getForAdress(target, () => {}, 10);
    const res = TransactionFilter.parse(transactions, FilterType.Transfer);
    assert.isNotEmpty(res);
  });

  it('Parse memo history', async () => {
    const transactions = await Signatures.getForAdress(target, () => {}, 10);
    const res = TransactionFilter.parse(transactions, FilterType.Memo);
    assert.isNotEmpty(res);
  });

  it('Parse Mint history', async () => {
    const transactions = await Signatures.getForAdress(target, () => {}, 10);
    const res = TransactionFilter.parse(transactions, FilterType.Mint);
    assert.isNotEmpty(res);
  });
});
