import { beforeAll, describe, expect, it } from '@jest/globals';
import { FilterType, History, OnErr, OnOk, SolNative } from '../../src';
import { Setup } from '../../../shared/test/testSetup';
import { Pubkey } from '../../../shared/src';

let target: Pubkey;
const onOk: OnOk<History> = (ok) => {
  ok.forEach((res) => {
    expect(JSON.stringify(res)).not.toBe('{}');
    expect(res.dateTime).not.toBeNull();
  });
};

const onErr: OnErr = (err: Error) => {
  console.log('# error: ', err);
  expect(false).toBe(true);
};

describe('SolNative', () => {
  beforeAll(async () => {
    const obj = await Setup.generateKeyPair();
    target = obj.source.pubkey;
  });

  it('Get transfer history', () => {
    SolNative.getHistory(target, FilterType.Transfer, onOk, onErr, 100);
  });

  it('[Error]Get Mint history', async () => {
    await SolNative.getHistory(
      target,
      FilterType.Mint,
      (ok: {}) => {
        console.log('# No pass through:', ok);
        expect(false).toBe(true);
      },
      (err: Error) => {
        expect(err.message).toBeTruthy();
      },
      100,
    );
  });
});
