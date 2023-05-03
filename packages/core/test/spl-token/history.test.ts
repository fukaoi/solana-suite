import { describe, it } from 'mocha';
import { assert } from 'chai';
import { SplToken } from '../../src/';
import { DirectionFilter } from '../../src/types/';

const mint = '6yiSjqsmmW48zJ6bM2Fb6jHHebHRfDzXoYRV1f1nt3JX';
const target = '8g66KBwriunG4PsKePYZaxd88dW3WKaryqtfpLqrijcV';

describe('SplToken', () => {
  it('Get token transfer history by owner address', async () => {
    await SplToken.getHistory(mint, target, (result) => {
      result.match(
        (ok) => {
          console.log('# SplToken.getHistory#1: ', ok);
          ok.forEach((res) => {
            assert.isNotEmpty(res.type);
            assert.isNotEmpty(res.source);
            assert.isNotEmpty(res.destination);
            assert.isNotEmpty(res.tokenAmount);
            assert.isNotEmpty(res.signers);
            assert.isNotEmpty(res.multisigAuthority);
            assert.isNotNull(res.date);
          });
        },
        (err) => assert.fail(err.message)
      );
    });
  });

  it('Get token transfer history with transfer dest filter', async () => {
    await SplToken.getHistory(
      mint,
      target,
      (result) => {
        result.match(
          (ok) => {
            console.log('# SplToken.getHistory#2: ', ok);
            ok.forEach((res) => {
              assert.isNotEmpty(res.type);
              assert.isNotEmpty(res.source);
              assert.isNotEmpty(res.destination);
              assert.isNotEmpty(res.tokenAmount);
              assert.isNotEmpty(res.signers);
              assert.isNotEmpty(res.multisigAuthority);
              assert.isNotNull(res.date);
            });
          },
          (err) => assert.fail(err.message)
        );
      },
      {
        directionFilter: DirectionFilter.Dest,
      }
    );
  });
});
