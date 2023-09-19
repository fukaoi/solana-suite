import { describe, expect, it } from '@jest/globals';
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
        expect(res.address.toString()).toBe(input[i].address);
        expect(res.share).toBe(input[i].share);
      });
    }
  });

  it('To un-define convert', async () => {
    const res = Convert.Creators.intoInfraSide([]);
    expect(res).toStrictEqual([]);
  });
});
