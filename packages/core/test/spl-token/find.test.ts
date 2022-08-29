import { describe, it } from 'mocha';
import { assert } from 'chai';
import { SplToken } from '../../src/';
const owner = 'Hc3FoHMo3Von8by8oKxx9nqTWkjQuGxM1sgyDQCLEMA9'.toPublicKey();
const notFoundTokenOwner =
  '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT'.toPublicKey();

describe('SplToken', () => {
  it('Not found token', async () => {
    const res = await SplToken.findByOwner(notFoundTokenOwner);

    assert.isTrue(res.isOk, `${res.unwrap()}`);

    res.unwrap().forEach((r) => {
      assert.isEmpty(r.mint);
      assert.isEmpty(r.amount);
      assert.isEmpty(r.owner);
    });
  });

  it('Get token info owned', async () => {
    const res = await SplToken.findByOwner(owner);

    assert.isTrue(res.isOk, `${res.unwrap()}`);

    res.unwrap().forEach((r) => {
      assert.isNotEmpty(r.mint);
      assert.isString(r.mint);
      assert.isString(r.owner);
    });
  });
});
