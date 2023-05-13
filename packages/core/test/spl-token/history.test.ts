import { describe, it } from 'mocha';
import { assert } from 'chai';
import { FilterType, SplToken } from '../../src/';
import { Setup } from '../../../shared/test/testSetup';
import { Pubkey } from '../../../shared';

let target: Pubkey;
describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    target = obj.source.pubkey;
  });

  it('Get token transfer history', async () => {
    await SplToken.getHistory(
      target,
      FilterType.Transfer,
      (result) => {
        result.match(
          (result) => {
            result.forEach((res) => {
              assert.isNotEmpty(res.source);
              assert.isNotEmpty(res.destination);
              assert.isNotEmpty(res.tokenAmount);
              assert.isNotEmpty(res.signers);
              assert.isNotEmpty(res.multisigAuthority);
              assert.isNotNull(res.dateTime);
            });
          },
          (err: Error) => assert.fail(err.message)
        );
      },
      100
    );
  });

  it('Get memo history', async () => {
    await SplToken.getHistory(
      target,
      FilterType.Memo,
      (result) => {
        result.match(
          (result) => {
            result.forEach((res) => {
              assert.isNotEmpty(res.source);
              assert.isNotEmpty(res.destination);
              assert.isNotEmpty(res.tokenAmount);
              assert.isNotEmpty(res.signers);
              assert.isNotEmpty(res.multisigAuthority);
              assert.isNotNull(res.dateTime);
            });
          },
          (err: Error) => assert.fail(err.message)
        );
      },
      100
    );
  });

  it('Get mint history', async () => {
    await SplToken.getHistory(
      target,
      FilterType.Mint,
      (result) => {
        result.match(
          (result) => {
            result.forEach((res) => {
              assert.isNotEmpty(res.source);
              assert.isNotEmpty(res.destination);
              assert.isNotEmpty(res.tokenAmount);
              assert.isNotEmpty(res.signers);
              assert.isNotEmpty(res.multisigAuthority);
              assert.isNotNull(res.dateTime);
            });
          },
          (err: Error) => assert.fail(err.message)
        );
      },
      100
    );
  });
});
