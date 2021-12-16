import {describe, it} from 'mocha';
import {Account, KeypairStr} from '../src';
import {assert} from 'chai';
import {PublicKey} from '@solana/web3.js';
import {Setup} from './utils/setup';

let source: KeypairStr;

describe('Account', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Reuest airdrop with 3 SOL', async () => {
    const res = await Account.requestAirdrop(source.toPubkey(), 3);
    assert.isTrue(res.isOk, res.unwrap());
    const balance = await Account.getBalance(source.toPubkey());
    assert.isTrue(balance.isOk, balance.unwrap().toString());
  });

  it('Get balance at publicKey', async () => {
    const res = await Account.getBalance(source.toPubkey());
    assert.isTrue(res.isOk);
    console.log('# balance sol: ', res.unwrap());
  });

  it('Get token balance at publicKey', async () => {
    const pubkey = 'D1r8Uea5uVQ9u3uNr8Nrg49t6BmkgnwLYYVmwZ3WhbPT';
    const tokenkey = '5k1WAQeAYUPiQnNWF557zBTqhMHfsi5utnE7TVSjd5Ut';
    const res = await Account.getTokenBalance(
      pubkey.toPubkey(),
      tokenkey.toPubkey()
    );
    assert.isTrue(res.isOk);
    console.log('# balance token: ', res.unwrap());
  });

  it('Get lamports balance at publicKey', async () => {
    const res = await Account.getBalance(
      source.toPubkey(),
      'lamports'
    );
    assert.isTrue(res.isOk);
    console.log('# balance lamports: ', res.unwrap());
  });

  it('find token address', async () => {
    const res = await Account.findAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPubkey(),
      '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS'.toPubkey(),
    );
    assert.isTrue(res.isOk);
    assert.isNotNull(res.unwrap());
  });

  it('find metaplex token address', async () => {
    const res = await Account.findMetaplexAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPubkey(),
    );
    assert.isTrue(res.isOk);
    assert.isNotNull(res.unwrap());
  });

  it('string to PublicKey', async () => {
    const pubkey = '6KJBDz6qPZZyJ9gAWXSgHufqAzU8pnhQmVdTitfusYS5';
    const res = pubkey.toPubkey();
    assert.deepEqual(res, new PublicKey(pubkey));
  });

  it('Account to PublicKey', async () => {
    const account = Account.create();
    const res = account.toPubkey();
    assert.deepEqual(res, new PublicKey(account.pubkey));
  });

  it('Account to Keypair', async () => {
    const account = Account.create();
    const res = account.toKeypair();
    assert.deepEqual(res, account.secret.toKeypair());
  });
})
