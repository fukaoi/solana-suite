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
    const parser = TransactionFilter.parse(FilterType.Transfer);
    await Signatures.getForAdress(
      target,
      parser,
      (res) => {
        console.log(res);
        assert.isNotEmpty(res);
      },
      100,
      10
    );
  });

  it('Parse memo history', async () => {
    const parser = TransactionFilter.parse(FilterType.Memo);
    await Signatures.getForAdress(
      target,
      parser,
      (res) => {
        console.log(res);
        assert.isNotEmpty(res);
      },
      10
    );
  });

  it('Parse Mint history', async () => {
    const parser = TransactionFilter.parse(FilterType.Mint);
    await Signatures.getForAdress(
      target,
      parser,
      (res) => {
        console.log(res);
        assert.isNotEmpty(res);
      },
      10
    );
  });
});
