import { describe, it } from 'mocha';
import { FilterType, History, SolNative } from '../../src';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Pubkey } from '../../../shared/src';

let target: Pubkey;
const onOk: History.OnOk = (ok) => {
  ok.forEach((res) => {
    assert.isNotEmpty(res.source);
    assert.isNotEmpty(res.destination);
    assert.isNotEmpty(res.tokenAmount);
    assert.isNotEmpty(res.signers);
    assert.isNotEmpty(res.multisigAuthority);
    assert.isNotNull(res.dateTime);
  });
};

const onErr: History.OnErr = (err: Error) => assert.fail(err.message);

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    target = obj.source.pubkey;
  });

  it('Get transfer history', async () => {
    await SolNative.getHistory(target, FilterType.Transfer, onOk, onErr, 100);
  });

  it('Get Memo history', async () => {
    await SolNative.getHistory(target, FilterType.Memo, onOk, onErr, 100);

    it('[Error]Get Mint history', async () => {
      await SolNative.getHistory(
        target,
        FilterType.Mint,
        (_) => assert.fail('Dont go through here'),
        (err) => assert.isOk(err.message),
        100
      );
    });
  });
});
