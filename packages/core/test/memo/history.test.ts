import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Memo } from '../../src/memo/';

const target = 'Ebq72X3i8ug6AX2G3v2ZoLA4ZcxHurvMuJYorqJ6sALD';

describe('Memo', () => {
  it('Get Only memo history', async () => {
    await Memo.getHistory(
      target,
      (result) => {
        result.match(
          (result) => {
            result.forEach((res) => {
              console.log(res);
              // assert.isNotEmpty(res.sol);
              // assert.isNotEmpty(res.destination);
              // assert.isNotEmpty(res.source);
              // assert.isNotNull(res.date);
            });
          },
          (err) => assert.fail(err.message)
        );
      },
      100
    );
  });
});
