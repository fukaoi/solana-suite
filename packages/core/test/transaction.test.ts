import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Transaction} from '../src/'

const searchTokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';

describe('Transaction', () => {
  it('Get transaction data', async () => {
    const sig = 'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy';
    const res = await Transaction.get(sig);
    assert.isObject(res);
  });

  it('Get all transaction data with limit', async () => {
    const limit = 10;
    const res = await Transaction.getForAddress(searchTokenKey.toPublicKey(), limit);

    if (res[0].isOk) {
      assert.equal(res.length, limit);
      assert.isArray(res);
    } else {
      assert.isFalse(res[0].isErr, res[0].isErr && res[0].error.message);
    }
  });

  it('Get all transaction data with limit, until', async () => {
    const res = await Transaction.getForAddress(
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

  it('Get transfer history by mint', async () => {
    const limit = 10;
    const res = await Transaction.getHistory(
      searchTokenKey.toPublicKey(),
      {limit}
    );
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap().length, limit)
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get transfer history with set optional filter', async () => {
    const limit = 20;
    const res = await Transaction.getHistory(
      searchTokenKey.toPublicKey(),
      {
        limit,
        actionFilter: [Transaction.Filter.MintTo],
      }
    );
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap()[0].type, Transaction.Filter.MintTo);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get transfer history with transfer destination filter', async () => {
    const destination = '2wxMtAe3nwQu5Ai2XuMgX4gxvYhTvXtedrvo7p9jDepn';
    const res = await Transaction.getHistory(
      searchTokenKey.toPublicKey(),
      {
        directionFilter: Transaction.DirectionFilter.Dest,
      }
    );
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      // console.log(v.info);
      assert.isNotNull(v.date);
      assert.equal(v.info.destination, destination);
    });
  });

  it('Get transfer history with transfer source filter', async () => {
    const source = '2wxMtAe3nwQu5Ai2XuMgX4gxvYhTvXtedrvo7p9jDepn';
    const res = await Transaction.getHistory(
      searchTokenKey.toPublicKey(),
      {
        directionFilter: Transaction.DirectionFilter.Source,
      }
    );

    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
      assert.equal(v.info.source, source);
    });
  });

  it('Get transfer history by address', async () => {
    const searchAddress = 'HeH2PRj4GEdLCsbKQ18LvwhbuH4anmPQ3HoeRsJmymVw'.toPublicKey();
    const res = await Transaction.getHistory(
      searchAddress
    );
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer history by owner address', async () => {
    const mint = '9v7HRkw3Fdt3Ee45z4Y9Mn9jzakHBQmSRZudPJGjbruY'.toPublicKey();
    const searchAddress = 'Gd5ThBjFzEbjfbJFGqwmBjDXR9grpAdqzb2L51viTqYV'.toPublicKey();
    const res = await Transaction.getTokenHistory(
      mint,
      searchAddress,
    );
    assert.isTrue(res.isOk);
    assert.isTrue(res.unwrap().length > 0);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer history with transfer source filter', async () => {
    const mint = '9v7HRkw3Fdt3Ee45z4Y9Mn9jzakHBQmSRZudPJGjbruY'.toPublicKey();
    const searchAddress = 'Gd5ThBjFzEbjfbJFGqwmBjDXR9grpAdqzb2L51viTqYV'.toPublicKey();
    const res = await Transaction.getTokenHistory(
      mint,
      searchAddress,
    );
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
    const mint = '6yiSjqsmmW48zJ6bM2Fb6jHHebHRfDzXoYRV1f1nt3JX'.toPublicKey();
    const searchAddress = '8g66KBwriunG4PsKePYZaxd88dW3WKaryqtfpLqrijcV'.toPublicKey();
    const res = await Transaction.getTokenHistory(
      mint,
      searchAddress,
      {
        directionFilter: Transaction.DirectionFilter.Dest,
      }
    );
    assert.isTrue(res.isOk);
    assert.isTrue(res.unwrap().length > 0);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer history by owner address, Use action filter MintTo', async () => {
    const mint = 'Cz6q12K9MuZHsekKPp71Fny24hVBY3pVhsBkgnksXVKV';
    const res = await Transaction.getHistory(
      mint.toPublicKey(),
      {
        actionFilter: [
          Transaction.Filter.MintTo,
        ]
      }
    );
    assert.isTrue(res.isOk);
    assert.isTrue(res.unwrap().length > 0);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer history by owner address, Use action filter create', async () => {
    const mint = 'Cz6q12K9MuZHsekKPp71Fny24hVBY3pVhsBkgnksXVKV';
    const res = await Transaction.getHistory(
      mint.toPublicKey(),
      {
        actionFilter: [
          Transaction.Filter.Create
        ]
      }
    );
    assert.isTrue(res.isOk);
    assert.isTrue(res.unwrap().length > 0);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });
});
