import {describe, it} from 'mocha';
import {Account} from '../src/account';
import {assert, expect} from 'chai';
import {Keypair} from '@solana/web3.js';

let source: Keypair;

describe('Account', () => {
  before(async () => {
    source = await Account.createAccount();
  });

  it('return Account(Keypair) object', async () => {
    console.log(`created account(pubkey): ${source.publicKey}`);
    console.log(`created account(secret): ${source.secretKey}`);
    assert.isObject(source);
  });

  it('Get balance at publicKey', async () => {
    const res = await Account.getBalance(source.publicKey);
    console.log(res);
    expect(res).to.equal(10);
  });

  it('Get balance at publicKey via lamports', async () => {
    const res = await Account.getBalance(source.publicKey, 'lamports');
    console.log(res);
    expect(res).to.equal(Account.DEFAULT_AIRDROP_AMOUNT);
  });

  it('find token address', async () => {
    const res = await Account.findAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ',
      '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS',
    );
    console.log(res.toBase58());
  });

  it('Get transaction data from user pubkey', async () => {
    await Account.getTransaction('7hy48Kc9BZEet6CXkCNHhmqhNCgNRiJ96Mwii9JUREsc');
  });
})
