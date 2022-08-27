import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Internals_Find } from '../../src/internals/_find';

const searchTokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';

describe('Internals_Find', () => {
  it('Get transaction data', async () => {
    const sig =
      'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy';
    const res = await Internals_Find.get(sig);
    assert.isObject(res);
  });

  it('Get all transaction data with limit', async () => {
    const limit = 10;
    const res = await Internals_Find.getForAddress(
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
    const res = await Internals_Find.getForAddress(
      searchTokenKey.toPublicKey(),
      undefined,
      undefined,
      '4BpP9ugxmnJbCegPXfXXP78A25chuNcLVZzRT4Gu1vPT8nEAbZzWuX8BWeytLR45qASFLb7PzakLCn29wJLQciQ5'
    );
    if (res[0].isOk) {
      assert.isArray(res);
    } else {
      assert.isFalse(res[0].isErr, res[0].isErr && res[0].error.message);
    }
  });
});
