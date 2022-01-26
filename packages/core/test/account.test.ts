import {describe, it} from 'mocha';
import {Account, KeypairStr} from '../src';
import {assert} from 'chai';
import {PublicKey} from '@solana/web3.js';
import {Setup} from '../../shared/test/setup';

let source: KeypairStr;

describe('Account', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Reuest airdrop with 3 SOL', async () => {
    const res = await Account.requestAirdrop(source.toPublicKey(), 3);
    assert.isTrue(res.isOk, res.unwrap());
    const balance = await Account.getBalance(source.toPublicKey());
    assert.isTrue(balance.isOk, balance.unwrap().toString());
  });

  it('Get account info', async () => {
    const res = await Account.getInfo(source.toPublicKey());
    if (res.isErr) {
      assert(res.error.message);
    }
    if (res.isOk) {
      const info = res.value as Account.AccountInfo;
      assert.isNumber(info.lamports);
      assert.isDefined(info.data);
      assert.isNotEmpty(info.owner);
      assert.isNumber(info.rentEpoch);
      assert.isBoolean(info.executable);
    }
  });

  it('Get account info via token account', async () => {
    const tokenAccount = '7huF1Cu7eXuaiSvJLuZvgAvS21K3M5PKvjm7mp5vRxE9'.toPublicKey();
    const res = await Account.getInfo(tokenAccount);
    if (res.isErr) {
      assert(res.error.message);
    }

    if (res.isOk) {
      const info = res.value as Account.TokenAccountInfo;
      assert.isNotEmpty(info.owner);
      assert.isNotEmpty(info.mint);
      assert.isNotEmpty(info.state);
      assert.isNotEmpty(info.tokenAmount);
    }
 });

  it('[Err]Not found address', async () => {
    const tokenAccount = 'DUc7jGemNCv5A2q9GDDsnYn6JguMViVqfWyBdmPxvUG1'.toPublicKey();
    const res = await Account.getInfo(tokenAccount);
    assert.isTrue(res.isErr);
  });

  it('Get balance at publicKey', async () => {
    const res = await Account.getBalance(source.toPublicKey());
    assert.isTrue(res.isOk);
    console.log('# balance sol: ', res.unwrap());
  });

  it('Get token balance at publicKey', async () => {
    const pubkey = 'D1r8Uea5uVQ9u3uNr8Nrg49t6BmkgnwLYYVmwZ3WhbPT';
    const tokenkey = '5k1WAQeAYUPiQnNWF557zBTqhMHfsi5utnE7TVSjd5Ut';
    const res = await Account.getTokenBalance(
      pubkey.toPublicKey(),
      tokenkey.toPublicKey()
    );
    assert.isTrue(res.isOk);
    console.log('# balance token: ', res.unwrap());
  });

  it('Get lamports balance at publicKey', async () => {
    const res = await Account.getBalance(
      source.toPublicKey(),
      'lamports'
    );
    assert.isTrue(res.isOk);
    console.log('# balance lamports: ', res.unwrap());
  });

  it('find token address', async () => {
    const res = await Account.findAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPublicKey(),
      '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS'.toPublicKey(),
    );
    assert.isTrue(res.isOk);
    assert.isNotNull(res.unwrap());
  });

  it('string to PublicKey', async () => {
    const pubkey = '6KJBDz6qPZZyJ9gAWXSgHufqAzU8pnhQmVdTitfusYS5';
    const res = pubkey.toPublicKey();
    assert.deepEqual(res, new PublicKey(pubkey));
  });

  it('Account to PublicKey', async () => {
    const account = Account.create();
    const res = account.toPublicKey();
    assert.deepEqual(res, new PublicKey(account.pubkey));
  });

  it('Account to Keypair', async () => {
    const account = Account.create();
    const res = account.toKeypair();
    assert.deepEqual(res, account.toKeypair());
  });
})
