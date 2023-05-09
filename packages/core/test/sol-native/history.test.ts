import { describe, it } from 'mocha';
import { FilterType, SolNative } from '../../src';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Pubkey } from '../../../shared/src';

let target: Pubkey;

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    target = obj.source.pubkey;
  });

  it('Get transfer history', async () => {
    await SolNative.getHistory(
      target,
      FilterType.Transfer,
      (result) => {
        result.match(
          (result) => {
            result.forEach((res) => {
              console.log(res);
              assert.isNotEmpty(res.sol);
              assert.isNotEmpty(res.destination);
              assert.isNotEmpty(res.source);
              assert.isNotNull(res.date);
            });
          },
          (err) => assert.fail(err.message)
        );
      },
      10
    );
  });
});
