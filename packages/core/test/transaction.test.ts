import {describe, it} from 'mocha';
import {assert} from 'chai';
import {ParsedConfirmedTransaction} from '@solana/web3.js';
import {Setup} from '../../shared/test/setup';
import {KeypairStr, Pubkey, SplToken, Transaction} from '../src/'


let source: KeypairStr;
let dest: KeypairStr;

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
    const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
    const limit = 10;
    const res = await Transaction.getAll(tokenKey.toPubkey(), limit);

    if (res.isOk) {
      assert.equal(res.value.length, limit);
      assert.isArray(res.value);
      assert.isObject((res.value as ParsedConfirmedTransaction[])[0]);
    } else {
      assert.isFalse(res.isErr, res.isErr && res.error.message);
    }
  });

  it('Get all transaction data with limit, until', async () => {
    const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
    const res = await Transaction.getAll(
      tokenKey.toPubkey(),
      undefined,
      undefined,
      '4BpP9ugxmnJbCegPXfXXP78A25chuNcLVZzRT4Gu1vPT8nEAbZzWuX8BWeytLR45qASFLb7PzakLCn29wJLQciQ5'
    );

    if (res.isOk) {
      assert.isArray(res.value);
      assert.isObject((res.value as ParsedConfirmedTransaction[])[0]);
    } else {
      assert.isFalse(res.isErr, res.isErr && res.error.message);
    }
  });

  it('Get transfer history by tokenKey', async () => {
    const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
    const limit = 10;
    const res = await Transaction.getTransactionHistory(tokenKey.toPubkey(), [], limit);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get transfer history with set optional filter', async () => {
    const tokenKey = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
    const limit = 20;
    const filter = 'mintTo';
    const res = await Transaction.getTransactionHistory(
      tokenKey.toPubkey(),
      [filter],
      limit
    );
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap()[0].type, filter);
    assert.equal(res.unwrap().length, limit);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get transfer history with set optional filter limit 100', async () => {
    const tokenKey = 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s';
    const limit = 100;
    const filter = 'mintTo';
    const res = await Transaction.getTransactionHistory(
      tokenKey.toPubkey(),
      [filter],
      limit
    );
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap()[0].type, filter);
    assert.equal(res.unwrap().length, limit);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get transfer history with transfer destination filter', async () => {
    const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
    const destination = '2wxMtAe3nwQu5Ai2XuMgX4gxvYhTvXtedrvo7p9jDepn';
    const limit = 10;
    const res = await Transaction.getTransactionHistory(
      tokenKey.toPubkey(), 
      [], 
      limit,
      {
        filter: Transaction.DirectionType.Dest, 
        pubkey: destination.toPubkey()
      }
    );

    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
      assert.equal(v.info.destination, destination);
    });
  });

  it('Get transfer history with transfer source filter', async () => {
    const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
    const source = '2wxMtAe3nwQu5Ai2XuMgX4gxvYhTvXtedrvo7p9jDepn';
    const limit = 3;
    const res = await Transaction.getTransactionHistory(
      tokenKey.toPubkey(), 
      [], 
      limit,
      {
        filter: Transaction.DirectionType.Source, 
        pubkey: source.toPubkey()
      }
    );

    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
      assert.equal(v.info.source, source);
    });
  });

  it('Get transfer history by address', async () => {
    const limit = 3;
    const owner = 'Gd5ThBjFzEbjfbJFGqwmBjDXR9grpAdqzb2L51viTqYV'.toPubkey();
    const res = await Transaction.getTransactionHistory(owner, [], limit);
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.type);
      assert.isNotEmpty(v.info.source);
      assert.isNotEmpty(v.info.destination);
      assert.isNotEmpty(v.info.authority);
      assert.isNotNull(v.date);
    });
    assert.equal(res.unwrap().length, limit);
  });

  it('Get token transfer history by owner address', async () => {
    const tokenKey = 'EoRvjJXt25zzchc34qRVTRT3coe4ZrCkeSW24bFP4yU'.toPubkey();
    const owner = 'Gd5ThBjFzEbjfbJFGqwmBjDXR9grpAdqzb2L51viTqYV'.toPubkey();
    const res = await Transaction.getTokenTransactionHistory(
      tokenKey,
      owner,
      []
    );
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer history by owner address, Use filter options', async () => {
    const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
    const res = await Transaction.getTransactionHistory(
      tokenKey.toPubkey(),
      [
        Transaction.Filter.MintTo,
      ]
    );
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotNull(v.date);
    });
  });

  it('Get token transfer destination history', async () => {
    const tokenKey = '2UxjqYrW7tuE5VcMTBcd8Lux7NyWzvoki2FkChQtB7Y6';
    const res = await Transaction.getTransferTokenDestinationList(tokenKey.toPubkey());
    assert.isTrue(res.isOk);
    res.unwrap().forEach((v) => {
      assert.isNotEmpty(v.dest);
      assert.isNotNull(v.date);
    });
  });

  it('Subscribe a account(pubkey)', async () => {
    const subscribeId = Transaction.subscribeAccount(
      dest.pubkey.toPubkey(),
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
      source.toPubkey(),
      [source.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL
    );

  const tokenKey = inst1.unwrap().data as Pubkey;

  const inst2 = await SplToken.transfer(
    tokenKey.toPubkey(),
    source.pubkey.toPubkey(),
    dest.pubkey.toPubkey(),
    [source.secret.toKeypair()],
    1,
    MINT_DECIMAL
  );

  const res = await [inst1, inst2].submit();
  res.isErr && console.error(res.error);
}

const sleep = async (sec: number) => new Promise(r => setTimeout(r, sec * 1000));


