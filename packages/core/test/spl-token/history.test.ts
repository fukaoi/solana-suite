import { beforeAll, describe, expect, it } from '@jest/globals';
import { FilterType, History, OnErr, OnOk, SplToken } from '../../src/';
import { Setup } from '../../../shared/test/testSetup';
import { Pubkey } from '../../../shared';

let target: Pubkey;
const onOk: OnOk<History> = (ok) => {
  ok.forEach((res) => {
    expect(JSON.stringify(res)).not.toBe('{}');
    expect(res.dateTime).not.toBeNull();
  });
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

  it('Get token transfer history', async () => {
    await SplToken.getHistory(target, FilterType.Transfer, onOk, onErr, 100);
  });

  it('Get memo history', async () => {
    await SplToken.getHistory(target, FilterType.Memo, onOk, onErr, 100);
  });

  it('Get mint history', async () => {
    await SplToken.getHistory(target, FilterType.Mint, onOk, onErr, 100);
  });
});
