import { describe, it } from '@jest/globals';
import { KeypairAccount } from '@solana-suite/shared';
import { Convert } from '~/convert/creators';

describe('Convert.Creators', () => {
  it('To input convert', async () => {
    const creator1 = KeypairAccount.create();
    const creator2 = KeypairAccount.create();
    const creator3 = KeypairAccount.create();
    const creator4 = KeypairAccount.create();
    const input = [
      {
        address: creator1.pubkey,
        share: 20,
        verified: false,
      },
      {
        address: creator2.pubkey,
        share: 30,
        verified: false,
      },
      {
        address: creator3.pubkey,
        share: 40,
        verified: false,
      },
      {
        address: creator4.pubkey,
        share: 10,
        verified: false,
      },
    ];
    const results = Convert.Creators.intoInfraSide(input);
    console.log('# converted creators', results);
    if (results) {
      results.forEach((res, i) => {
        assert.equal(res.address.toString(), input[i].address);
        assert.equal(res.share, input[i].share);
      });
    } else {
      assert.fail('`results` is null, empty');
    }
  });

  it('To un-define convert', async () => {
    const res = Convert.Creators.intoInfraSide([]);
    assert.deepEqual(res, []);
  });
});