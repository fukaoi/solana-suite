import { beforeAll, describe, expect, it } from '@jest/globals';
import { FilterType, History, OnErr, OnOk, SplToken } from '../../src/';
import { Setup } from '../../../shared/test/testSetup';
import { Pubkey } from '../../../shared';

let target: Pubkey;
const onOk: OnOk<History> = (ok) => {
  console.log(ok, ok.length);
  // ok.forEach((res) => {
  //   expect(JSON.stringify(res)).not.toBe('{}');
  //   expect(res.dateTime).not.toBeNull();
  // });
};

const onErr: OnErr = (err: Error) => {
  console.error(err);
  expect(false).toBe(true);
};

describe('SplToken', () => {
  beforeAll(async () => {
    const obj = await Setup.generateKeyPair();
    target = obj.source.pubkey;
  });

  it.skip('Get token transfer history', async () => {
    await SplToken.getHistory(target, FilterType.Transfer, onOk, onErr);
  });

  it.skip('Get memo history', async () => {
    await SplToken.getHistory(target, FilterType.Memo, onOk, onErr);
  });

  it('Get mint history', () => {
    SplToken.getHistory(target, FilterType.Mint, onOk, onErr);
  });
});
