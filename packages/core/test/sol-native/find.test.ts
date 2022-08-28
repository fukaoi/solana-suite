import { describe, it, before } from 'mocha';
import { SolNative, KeypairStr } from '../../src';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Filter, DirectionFilter } from '../../src/types/find';

let source: KeypairStr;
const searchTokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Get transfer history with set optional filter', async () => {
    const limit = 20;
    const res = await SolNative.findByOwner(searchTokenKey.toPublicKey(), {
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
    const res = await SolNative.findByOwner(searchTokenKey.toPublicKey(), {
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
    const res = await SolNative.findByOwner(searchTokenKey.toPublicKey(), {
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
    const res = await SolNative.findByOwner(searchAddress);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotNull(v.date);
    });
  });

  it('Get lamports balance at publicKey', async () => {
    const res = await SolNative.getBalance(source.toPublicKey(), 'lamports');
    assert.isTrue(res.isOk);
    console.log('# balance lamports: ', res.unwrap());
  });
});
