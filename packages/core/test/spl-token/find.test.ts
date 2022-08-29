import { describe, it } from 'mocha';
import { assert } from 'chai';
import { SplToken } from '../../src/';

describe('SplToken', () => {
  it('Not found token', async () => {
    const owner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT'.toPublicKey();
    const res = await SplToken.findByOwner(owner);
    assert.isTrue(res.isOk, `${res.unwrap()}`);

    res.unwrap().forEach((r) => {
      assert.isEmpty(r.mint);
      assert.isEmpty(r.tokenAmount);
    });
  });

  it('Get token info owned', async () => {
    const owner = 'Hc3FoHMo3Von8by8oKxx9nqTWkjQuGxM1sgyDQCLEMA9'.toPublicKey();
    const res = await SplToken.findByOwner(owner);
    assert.isTrue(res.isOk, `${res.unwrap()}`);

    res.unwrap().forEach((r) => {
      assert.isNotEmpty(r.mint);
      assert.isString(r.mint);
      assert.isNumber(r.tokenAmount);
    });
  });
});
