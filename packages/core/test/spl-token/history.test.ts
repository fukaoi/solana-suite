import { describe, it } from 'mocha';
import { assert } from 'chai';
import { SplToken } from '../../src/';
import { DirectionFilter } from '../../src/types/history';

const mint = '6yiSjqsmmW48zJ6bM2Fb6jHHebHRfDzXoYRV1f1nt3JX';
const searchAddress = '8g66KBwriunG4PsKePYZaxd88dW3WKaryqtfpLqrijcV';

describe('SplToken', () => {
  it('Get token transfer history by owner address', async () => {
    const res = await SplToken.getHistory(mint, searchAddress);
    assert.isTrue(res.isOk);
    assert.isTrue(res.unwrap().length > 0);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer history with transfer dest filter', async () => {
    const res = await SplToken.getHistory(mint, searchAddress, {
      directionFilter: DirectionFilter.Dest,
    });
    assert.isTrue(res.isOk);
    assert.isTrue(res.unwrap().length > 0);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });
});
