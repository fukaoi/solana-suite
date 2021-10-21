import {describe, it} from 'mocha';
import {Wallet} from '../src';
import {assert} from 'chai';

let source: Wallet.KeyPair;

describe('Wallet', () => {
  before(async () => {
    source = await Wallet.create();
    console.log('# source address: ', source.pubkey.toAddressUrl());
  });

  it('Reuest airdrop', async () => {
    const res = await Wallet.requestAirdrop(source.pubkey.toPubKey());
    assert.isTrue(res.isOk);
  });

  it('Get balance at publicKey', async () => {
    const dropSol = 1;
    const res = await Wallet.getBalance(source.pubkey.toPubKey());
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap(), dropSol);
  });

  it('Get lamports balance at publicKey', async () => {
    const res = await Wallet.getBalance(
      source.pubkey.toPubKey(),
      'lamports'
    );
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap(), Wallet.DEFAULT_AIRDROP_AMOUNT);
  });

  it('find token address', async () => {
    const res = await Wallet.findAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPubKey(),
      '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS'.toPubKey(),
    );
    assert.isTrue(res.isOk);
    assert.isNotNull(res.unwrap());
  });

  it('find metaplex token address', async () => {
    const res = await Wallet.findMetaplexAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPubKey(),
    );
    assert.isTrue(res.isOk);
    assert.isNotNull(res.unwrap());
  });
})
