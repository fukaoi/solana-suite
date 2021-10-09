import {describe, it} from 'mocha';
import {Wallet, E} from '../src';
import {assert} from 'chai';

let source: Wallet.KeyPair;

describe('Wallet', () => {
  before(async () => {
    source = await Wallet.create();
    await Wallet.requestAirdrop(source.pubkey.toPubKey());
    console.log('# source address: ', source.pubkey.toAddressUrl());
  });

  it('Get balance at publicKey and request airdrop', async () => {
    const dropSol = 1;
    const res = await Wallet.getBalance(source.pubkey.toPubKey());
    E.isRight(res) && assert.equal(res.right, dropSol);
  });

  // it('Get balance at publicKey via lamports', async () => {
    // const res = await Wallet.getBalance(
      // source.pubkey.toPubKey(),
      // 'lamports'
    // );
    // assert.equal(res, Wallet.DEFAULT_AIRDROP_AMOUNT);
  // });

  // it('find token address', async () => {
    // const res = await Wallet.findAssocaiatedTokenAddress(
      // 'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPubKey(),
      // '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS'.toPubKey(),
    // );
    // assert.isNotNull(res.toBase58());
  // });
})
