import { describe, it } from 'mocha';
import { Signatures } from '../src/signatures';
import { assert } from 'chai';
import { FilterType, ModuleName } from '../src/';
import { Setup } from '../../shared/test/testSetup';
import { Pubkey } from '../../shared/src';
import { TransactionFilter } from '../src/transaction-filter';
import { ok } from 'assert';

let target: Pubkey;

describe('TransactionFilter', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    target = obj.source.pubkey;
  });

  it('Parse transfer history by SolNative', async () => {
    const parser = TransactionFilter.parse(
      FilterType.Transfer,
      ModuleName.SolNative
    );
    await Signatures.getForAdress(
      target,
      parser,
      (res) => {
        console.log(res);
        console.log('# response size:', res.unwrap().length);
        assert.isNotEmpty(res);
      },
      100
    );
  });

  it('Parse memo history by SplToken', async () => {
    const parser = TransactionFilter.parse(
      FilterType.Memo,
      ModuleName.SplToken
    );
    await Signatures.getForAdress(
      target,
      parser,
      (res) => {
        console.log(res);
        assert.isNotEmpty(res);
      },
      100
    );
  });

  it('Parse Mint history', async () => {
    const parser = TransactionFilter.parse(
      FilterType.Mint,
      ModuleName.SplToken
    );
    await Signatures.getForAdress(
      target,
      parser,
      (res) => {
        console.log(res);
        assert.isNotEmpty(res);
      },
      100
    );
  });
it('[Error]Parse Mint history by SolNative', async () => {
    const parser = TransactionFilter.parse(
      FilterType.Mint,
      ModuleName.SolNative
    );
    await Signatures.getForAdress(
      target,
      parser,
      (histories) => {
        histories.match(
          (_) => assert.fail('Dont go through here'),
          (err) => assert.isOk(err.message)
        );
      },
      100
    );
  });
});
