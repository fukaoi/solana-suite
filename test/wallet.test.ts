import {describe, it} from 'mocha';
import {Wallet} from '../src/wallet';
import {assert} from 'chai';

let source: Wallet.KeyPair;

describe('Wallet', () => {
  before(async () => {
    source = await Wallet.create();
  });

  it('return Account(Keypair) object', async () => {
    console.log(`created account(pubkey): ${source.pubkey}`);
    console.log(`created account(secret): ${source.secret}`);
    assert.isObject(source);
  });

  it('Get balance at publicKey', async () => {
    const res = await Wallet.getBalance(source.pubkey.toPubKey());
    console.log(res);
    assert.equal(res, 1);
  });

  it('Get balance at publicKey via lamports', async () => {
    const res = await Wallet.getBalance(source.pubkey.toPubKey(), 'lamports');
    console.log(res);
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
