import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Setup} from '../../shared/test/testSetup';
import {KeypairStr, Pubkey, SplToken, Transaction} from '../src/'


let source: KeypairStr;
let dest: KeypairStr;
const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';

describe('Transaction', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('Get transaction data', async () => {
    const sig = 'WT6DcvZZuGvf4dabof8r7HSBmfbjN7ERvBJTSB4d5x15NKZwM8TDMSgNdTkZzMTCuX7NP1QfR6WPNmGyhiaFKoy';
    const res = await Transaction.get(sig);
    assert.isObject(res);
  });

  it('Get all transaction data with limit', async () => {
    const limit = 10;
    const res = await Transaction.getForAddress(tokenKey.toPublicKey(), limit);

    if (res[0].isOk) {
      assert.equal(res.length, limit);
      assert.isArray(res);
    } else {
      assert.isFalse(res[0].isErr, res[0].isErr && res[0].error.message);
    }
  });

  it('Get all transaction data with limit, until', async () => {
    const res = await Transaction.getForAddress(
      tokenKey.toPublicKey(),
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

  it('Get transfer history by tokenKey', async () => {
    const limit = 10;
    const res = await Transaction.getHistory(
      tokenKey.toPublicKey(),
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
      tokenKey.toPublicKey(),
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
      tokenKey.toPublicKey(),
      {
        transferFilter: {
          filter: Transaction.DirectionType.Dest,
          pubkey: destination.toPublicKey()
        }
      }
    );
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      console.log(v.info);
      assert.isNotNull(v.date);
      assert.equal(v.info.destination, destination);
    });
  });

  it('Get transfer history with transfer source filter', async () => {
    const source = '2wxMtAe3nwQu5Ai2XuMgX4gxvYhTvXtedrvo7p9jDepn';
    const res = await Transaction.getHistory(
      tokenKey.toPublicKey(),
      {
        transferFilter: {
          filter: Transaction.DirectionType.Source,
          pubkey: source.toPublicKey()
        }
      }
    );

    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
      assert.equal(v.info.source, source);
    });
  });

  it('Get transfer history by address', async () => {
    const owner = 'HeH2PRj4GEdLCsbKQ18LvwhbuH4anmPQ3HoeRsJmymVw'.toPublicKey();
    const res = await Transaction.getHistory(
      owner,
      {}
    );
    console.log(res);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer history by owner address', async () => {
    const tokenKey = '9v7HRkw3Fdt3Ee45z4Y9Mn9jzakHBQmSRZudPJGjbruY'.toPublicKey();
    const owner = 'Gd5ThBjFzEbjfbJFGqwmBjDXR9grpAdqzb2L51viTqYV'.toPublicKey();
    const res = await Transaction.getTokenHistory(
      tokenKey,
      owner,
      {}
    );
    assert.isTrue(res.isOk);
    assert.isTrue(res.unwrap().length > 0);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer history by owner address, Use action filter MintTo', async () => {
    const tokenKey = 'Cz6q12K9MuZHsekKPp71Fny24hVBY3pVhsBkgnksXVKV';
    const res = await Transaction.getHistory(
      tokenKey.toPublicKey(),
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
    const tokenKey = 'Cz6q12K9MuZHsekKPp71Fny24hVBY3pVhsBkgnksXVKV';
    const res = await Transaction.getHistory(
      tokenKey.toPublicKey(),
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

  it('Subscribe a account(pubkey)', async () => {
    const subscribeId = Transaction.subscribeAccount(
      dest.pubkey.toPublicKey(),
      (v: Transaction.TransferHistory) => {
        console.log('# Subscribe result: ', v);
        assert.isNotEmpty(v.type);
        assert.isNotNull(v.date);
        assert.isNotNull(v.info.mint);
        assert.isNotEmpty(v.info.source);
        assert.isNotEmpty(v.info.destination);
      }
    );
    for (let i = 0; i < 3; i++) await sendContinuously();
    await sleep(15);
    Transaction.unsubscribeAccount(subscribeId);
    assert.ok('success subscribe');
  });
});

const sendContinuously = async (): Promise<void> => {
  const TOKEN_TOTAL_AMOUNT = 10000000;
  const MINT_DECIMAL = 2;

  const inst1 =
    await SplToken.mint(
      source.toPublicKey(),
      [source.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL
    );

  const tokenKey = inst1.unwrap().data as Pubkey;

  const inst2 = await SplToken.transfer(
    tokenKey.toPublicKey(),
    source.pubkey.toPublicKey(),
    dest.pubkey.toPublicKey(),
    [source.secret.toKeypair()],
    1,
    MINT_DECIMAL
  );

  const res = await [inst1, inst2].submit();
  res.isErr && console.error(res.error);
}

const sleep = async (sec: number) => new Promise(r => setTimeout(r, sec * 1000));


