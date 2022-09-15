import { describe, it } from 'mocha';
import { SolNative } from '../../src';
import { assert } from 'chai';
import { Filter, DirectionFilter } from '../../src/types/history';

const searchTokenKey = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk';

describe('SolNative', () => {
  it('Get transfer history with set optional filter', async () => {
    const limit = 20;
    const res = await SolNative.getHistory(searchTokenKey.toPublicKey(), {
      limit,
      actionFilter: [Filter.MintTo],
    });
    console.log('# getHistory: ', res);
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap()[0].type, Filter.MintTo);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get transfer history with transfer destination filter', async () => {
    const res = await SolNative.getHistory(searchTokenKey.toPublicKey(), {
      directionFilter: DirectionFilter.Dest,
    });
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
      assert.equal(v.info.destination, searchTokenKey);
    });
  });

  it('Get transfer history with transfer source filter', async () => {
    const res = await SolNative.getHistory(searchTokenKey.toPublicKey(), {
      directionFilter: DirectionFilter.Source,
    });

    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
      assert.equal(v.info.source, searchTokenKey);
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
