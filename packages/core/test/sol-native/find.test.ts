import { describe, it } from 'mocha';
import { SolNative } from '../../src';
import { assert } from 'chai';

const owner = '6bo6UqEZ2D7C4oMpycxBzY5eLeHdmUkCrFXozhqUd4sp';

describe('SolNative', () => {
  it('find owner info', async () => {
    const res = await SolNative.findByOwner(owner.toPublicKey());

    if (res.isErr) {
      assert(res.error.message);
    }

    if (res.isOk) {
      const info = res.value;
      assert.isNumber(info.sol);
      assert.isNumber(info.lamports);
      assert.isString(info.owner);
      assert.isNumber(info.rentEpoch);
    }
  });
});
