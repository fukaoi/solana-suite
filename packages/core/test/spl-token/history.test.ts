import { describe, it } from 'mocha';
import { assert } from 'chai';
import { FilterType, SplToken } from '../../src/';

const mint = '6yiSjqsmmW48zJ6bM2Fb6jHHebHRfDzXoYRV1f1nt3JX';
const target = '8g66KBwriunG4PsKePYZaxd88dW3WKaryqtfpLqrijcV';

describe('SplToken', () => {
  it('Get token transfer history', async () => {
    await SplToken.getHistory(
      mint,
      target,
      FilterType.Transfer,
      (result) => {
        result.match(
          (res) => {
            console.log(res);
            assert.isNotEmpty(res.source);
            assert.isNotEmpty(res.destination);
            assert.isNotEmpty(res.tokenAmount);
            assert.isNotEmpty(res.signers);
            assert.isNotEmpty(res.multisigAuthority);
            assert.isNotNull(res.date);
          },
          (err) => assert.fail(err.message)
        );
      },
      100
    );
  });
});
