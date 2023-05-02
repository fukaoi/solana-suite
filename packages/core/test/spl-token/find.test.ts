import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Pubkey } from '../../../shared';
import { Sortable, SplToken } from '../../src/';

let owner: Pubkey;
const notFoundTokenOwner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT';
describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    owner = obj.source.pubkey;
  });

  it('Not found token', async () => {
    await SplToken.findByOwner(notFoundTokenOwner, (result) => {
      assert.isTrue(result.isOk);
      assert.isArray(result.unwrap());
    });
  });

  it.only('Get token info owned', async () => {
    await SplToken.findByOwner(owner, (result) => {
      result.match(
        (ok) => {
          ok.forEach((res) => {
            console.log(res.name);
            console.log(res.mint);
            console.log(res.symbol);
          });
        },
        (err) => assert.fail(err.message)
      );
    });
  });

  it('Get token info owned with Desc', async () => {
    await SplToken.findByOwner(
      owner,
      (result) => {
        assert.isTrue(result.isOk);
        assert.isArray(result.unwrap());
        assert.isTrue(result.unwrap().length > 0);
      },
      Sortable.Desc
    );
  });

  it('Get token info owned with Asc', async () => {
    await SplToken.findByOwner(
      owner,
      (result) => {
        assert.isTrue(result.isOk);
        assert.isArray(result.unwrap());
        assert.isTrue(result.unwrap().length > 0);
      },
      Sortable.Asc
    );
  });
});
