import { describe, it } from 'mocha';
import { Signatures } from '../src/signatures';
import { assert } from 'chai';
import { DirectionFilter, FilterType } from '../src/';
import { Setup } from '../../shared/test/testSetup';
import { Pubkey } from '../../shared/src';
import { TransactionFilter } from '../src/transaction-filter';

let target: Pubkey;

describe('TransactionFilter', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    // target = obj.dest.pubkey;
    target = obj.source.pubkey;
  });

  it('Parse transfer history', async () => {
    const transactions = await Signatures.getForAdress(target, () => {}, 10);
    const res = TransactionFilter.parse(
      target.toPublicKey(),
      transactions,
      FilterType.Transfer
      // FilterType.Mint
      // FilterType.Memo,
    );
    console.log('# response: ', res);
  });
});
