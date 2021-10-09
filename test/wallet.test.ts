import {describe, it} from 'mocha';
import {Wallet} from '../src';
import {assert} from 'chai';

let source: Wallet.KeyPair;

describe('Wallet', () => {
  before(async () => {
    source = await Wallet.create();
    console.log('# source address: ', source.pubkey.toAddressUrl());
  });

  it('Get balance at publicKey and request airdrop', async () => {
    const dropSol = 1;
    const res = await Wallet.getBalance(source.pubkey.toPubKey());
    assert.equal(res, dropSol);
  });

  it('Get balance at publicKey via lamports', async () => {
    const res = await Wallet.getBalance(
      source.pubkey.toPubKey(),
      'lamports'
    );
    assert.equal(res, Wallet.DEFAULT_AIRDROP_AMOUNT);
  });

  it('find token address', async () => {
    const res = await Wallet.findAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPubKey(),
      '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS'.toPubKey(),
    );
    assert.isNotNull(res.toBase58());
  });
})
