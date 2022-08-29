import { describe, it } from 'mocha';
import { SolNative } from '../../src';
import { assert } from 'chai';
import { Filter, DirectionFilter } from '../../src/types/history';

const searchTokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';

describe('SolNative', () => {
  it('Get transfer history with set optional filter', async () => {
    const limit = 20;
    const res = await SolNative.getHistory(searchTokenKey.toPublicKey(), {
      limit,
      actionFilter: [Filter.MintTo],
    });
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap()[0].type, Filter.MintTo);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get transfer history with transfer destination filter', async () => {
    const destination = '2wxMtAe3nwQu5Ai2XuMgX4gxvYhTvXtedrvo7p9jDepn';
    const res = await SolNative.getHistory(searchTokenKey.toPublicKey(), {
      directionFilter: DirectionFilter.Dest,
    });
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      // console.log(v.info);
      assert.isNotNull(v.date);
      assert.equal(v.info.destination, destination);
    });
  });

  it('Get transfer history with transfer source filter', async () => {
    const source = '2wxMtAe3nwQu5Ai2XuMgX4gxvYhTvXtedrvo7p9jDepn';
    const res = await SolNative.getHistory(searchTokenKey.toPublicKey(), {
      directionFilter: DirectionFilter.Source,
    });

    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
      assert.equal(v.info.source, source);
    });
  });

  it('Get transfer history by address', async () => {
    const searchAddress =
      'HeH2PRj4GEdLCsbKQ18LvwhbuH4anmPQ3HoeRsJmymVw'.toPublicKey();
    const res = await SolNative.getHistory(searchAddress);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotNull(v.date);
    });
  });
});
