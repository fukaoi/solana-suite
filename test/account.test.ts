import {describe, it} from 'mocha';
import {Account} from '../src/account';
import {assert, expect} from 'chai';

let source: Account.PubkeySecret;

describe('Account', () => {
  before(async () => {
    source = await Account.createAccount();
  });

  it('return Account(Keypair) object', async () => {
    console.log(`created account(pubkey): ${source.pubkey}`);
    console.log(`created account(secret): ${source.secret}`);
    assert.isObject(source);
  });

  it('Get balance at publicKey', async () => {
    const res = await Account.getBalance(source.pubkey);
    console.log(res);
    expect(res).to.equal(10);
  });

  it('Get balance at publicKey via lamports', async () => {
    const res = await Account.getBalance(source.pubkey, 'lamports');
    console.log(res);
    expect(res).to.equal(Account.DEFAULT_AIRDROP_AMOUNT);
  });

  it('find token address', async () => {
    const res = await Account.findAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ',
      '5hj62erLKeKSM29C5oZR8TGei7RrMG79voFkiCotRZmS',
    );
    assert.isNotNull(res.toBase58());
  });
})
