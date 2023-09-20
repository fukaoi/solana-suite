import { describe, expect, it } from '@jest/globals';
import { History, Memo, OnErr, OnOk } from '../../src/';

const target = 'Ebq72X3i8ug6AX2G3v2ZoLA4ZcxHurvMuJYorqJ6sALD';
const onOk: OnOk<History> = (ok) => {
  ok.forEach((res) => {
    expect(JSON.stringify(res)).not.toBe('{}');
    expect(res.dateTime).not.toBeNull();
  });
};

const onErr: OnErr = (err: Error) => {
  console.error('# error: ', err);
  expect(false).toBe(true);
};

describe('Memo', () => {
  it('Get Only memo history', async () => {
    await Memo.getHistory(target, onOk, onErr, 100);
  });
});
