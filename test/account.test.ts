import {describe, it} from 'mocha';
import {Account} from '../src';
import {assert} from 'chai';

let source: Account.KeypairStr;

describe('Account', () => {
  before(async () => {
    source = Account.create();
    console.log('# source address: ', source.pubkey.toAddressUrl());
  });

  it('Reuest airdrop', async () => {
    const res = await Account.requestAirdrop(source.pubkey.toPubKey());
    assert.isTrue(res.isOk);
  });

  it('Get balance at publicKey', async () => {
    const dropSol = 1;
    const res = await Account.getBalance(source.pubkey.toPubKey());
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap(), dropSol);
  });

  it('Get lamports balance at publicKey', async () => {
    const res = await Account.getBalance(
      source.pubkey.toPubKey(),
      'lamports'
    );
    assert.isTrue(res.isOk);
    assert.equal(res.unwrap(), Account.DEFAULT_AIRDROP_AMOUNT);
  });

  it('find token address', async () => {
    const res = await Account.findAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPubKey(),
      '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS'.toPubKey(),
    );
    assert.isTrue(res.isOk);
    assert.isNotNull(res.unwrap());
  });

  it('find metaplex token address', async () => {
    const res = await Account.findMetaplexAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPubKey(),
    );
    assert.isTrue(res.isOk);
    assert.isNotNull(res.unwrap());
  });
})
