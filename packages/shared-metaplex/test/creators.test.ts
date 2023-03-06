import { describe, it } from 'mocha';
import { KeypairAccount } from '../../shared/';
import { Creators } from '../src/creators';
import { assert } from 'chai';

describe('Creators', () => {
  it('To input convert', async () => {
    const creator1 = KeypairAccount.create();
    const creator2 = KeypairAccount.create();
    const input = [
      {
        address: creator1.pubkey,
        share: 40,
        authority: creator1.secret,
      },
      {
        address: creator2.pubkey,
        share: 60,
        authority: creator2.secret,
      },
    ];
    const res = Creators.toInputConvert(input);
    assert.equal(res[0].address.toString(), input[0].address);
    assert.equal(res[0].share, input[0].share);
    assert.deepEqual(res[0].authority, input[0].authority.toKeypair());
    assert.equal(res[1].address.toString(), input[1].address);
    assert.equal(res[1].share, input[1].share);
    assert.deepEqual(res[1].authority, input[1].authority.toKeypair());
  });
});
