import { describe, it } from 'mocha';
import { assert } from 'chai';
import { SolNative } from '../../src/sol-native/get-by-address';

const searchTokenKey = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk';
const searchTokenKey2 = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk';
const oldSig =
  '2fSh8kZbRtE5Xi8PVfxfQWKXXLDfzPygoeJdAN9XbW15aoqJHcdNUJVt5tF4B1nVt44cbkHmAWYLfkptbxGgYzjL';

describe.skip('SolNative', () => {
  it('Get all transaction data with limit', async () => {
    const limit = 2;
    const res = await SolNative.getByAddress(
      searchTokenKey.toPublicKey(),
      limit
    );

    console.log(res);
    assert.equal(res.length, limit);
    assert.isArray(res);
  });

  it('Get all transaction data with limit, until', async () => {
    const res = await SolNative.getByAddress(
      searchTokenKey2.toPublicKey(),
      undefined,
      undefined,
      oldSig
    );
    console.log('# oldSig2: ', res);
    assert.isArray(res);
  });
});
