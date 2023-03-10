import { describe, it } from 'mocha';
import { KeypairAccount } from '../../shared/';
import { Creators } from '../src/creators';
import { assert } from 'chai';

describe('Creators', () => {
  it('To input convert', async () => {
    const creator1 = KeypairAccount.create();
    const creator2 = KeypairAccount.create();
    const creator3 = KeypairAccount.create();
    const creator4 = KeypairAccount.create();
    const input = [
      {
        address: creator1.pubkey,
        share: 20,
        authority: creator1.secret,
      },
      {
        address: creator2.pubkey,
        share: 30,
        authority: creator2.secret,
      },
      {
        address: creator3.pubkey,
        share: 40,
        authority: creator3.secret,
      },
      {
        address: creator4.pubkey,
        share: 10,
        authority: creator4.secret,
      },
    ];
    const results = Creators.toInputConvert(input);
    console.log('# converted creators', results);
    results.forEach((res, i) => {
      assert.equal(res.address.toString(), input[i].address);
      assert.equal(res.share, input[i].share);
      assert.deepEqual(res.authority, input[i].authority.toKeypair());
    });
  });

  it('To undefine convert', async () => {
    const res = Creators.toInputConvert([]);
    assert.deepEqual(res, []);
  });
});
