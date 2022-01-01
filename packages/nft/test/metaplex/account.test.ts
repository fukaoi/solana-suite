import {describe, it} from 'mocha';
import {MetaplexAccount} from '../../src/metaplex';
import {assert} from 'chai';

describe('MetaplexAccount', () => {
  it('find metaplex token address', async () => {
    const res = await MetaplexAccount.findMetaplexAssocaiatedTokenAddress(
      'D7dKBiFxWKiSSew4fzinML1so4vEaSPmtiKV6qWMDUJJ'.toPublicKey(),
    );
    assert.isTrue(res.isOk);
    assert.isNotNull(res.unwrap());
  });
})
