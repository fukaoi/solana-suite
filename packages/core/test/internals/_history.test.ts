import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Internals_History } from '../../src/internals/_history';

const searchTokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
const oldSig = '47KcZGxPayz3cJ3Vy6mKCFmz6N4kGkKm3TDnb9VVJ4krrgdu3WznRKyweh4n6KfWgXTm2LzdVqf8sPmjV1H2u6YR';
const searchTokenKey2 = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk';
const oldSig2 = '2fSh8kZbRtE5Xi8PVfxfQWKXXLDfzPygoeJdAN9XbW15aoqJHcdNUJVt5tF4B1nVt44cbkHmAWYLfkptbxGgYzjL';

describe('Internals_Find', () => {
  it('Get transaction data', async () => {
    const res = await Internals_History.get(oldSig);
    console.log('# oldSig: ', res);
    assert.isObject(res);
  });

  it('Get all transaction data with limit', async () => {
    const limit = 2;
    const res = await Internals_History.getForAddress(
      searchTokenKey.toPublicKey(),
      limit
    );

    if (res[0].isOk) {
      assert.equal(res.length, limit);
      assert.isArray(res);
    } else {
      assert.isFalse(res[0].isErr, res[0].isErr && res[0].error.message);
    }
  });

  it('Get all transaction data with limit, until', async () => {
    const res = await Internals_History.getForAddress(
      searchTokenKey2.toPublicKey(),
      undefined,
      undefined,
      oldSig2,
    );
    console.log('# oldSig2: ', res);
    if (res[0].isOk) {
      assert.isArray(res);
    } else {
      assert.isFalse(res[0].isErr, res[0].isErr && res[0].error.message);
    }
  });
});
