import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Pubkey } from '../../../shared';
import { Sortable, SplToken } from '../../src/';

let owner: Pubkey;
let mint = '5cjaV2QxSrZ3qESwsH49JmQqrcakThBZ9uZ5NVCcqzHt'; // nft
// let mint = 'EFgwtsm4azvQcnRPhDZ8yV9we1A12PgecpJ3im79o4x3'; // token
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

  it('Get token info owned', async () => {
    await SplToken.findByOwner(owner, (result) => {
      result.match(
        (ok) => {
          ok.forEach((res) => {
            assert.isNotEmpty(res.name);
            assert.isNotEmpty(res.mint);
            assert.isNotEmpty(res.symbol);
            assert.isNotEmpty(res.uri);
            assert.isNotEmpty(res.royalty);
            assert.isNotEmpty(res.offchain);
          });
        },
        (err) => assert.fail(err.message)
      );
    });
  });

  it('Get token info owned with no Hold', async () => {
    await SplToken.findByOwner(
      owner,
      (result) => {
        result.match(
          (ok) => {
            ok.forEach((res) => {
              assert.isNotEmpty(res.name);
              assert.isNotEmpty(res.mint);
              assert.isNotEmpty(res.symbol);
              assert.isNotEmpty(res.uri);
              assert.isNotEmpty(res.royalty);
              assert.isNotEmpty(res.offchain);
            });
          },
          (err) => assert.fail(err.message)
        );
      },
      { isHolder: false }
    );
  });

  it('Get token info owned with Asc', async () => {
    await SplToken.findByOwner(
      owner,
      (result) => {
        result.match(
          (ok) => {
            ok.forEach((res) => {
              assert.isNotEmpty(res.name);
              assert.isNotEmpty(res.mint);
              assert.isNotEmpty(res.symbol);
              assert.isNotEmpty(res.uri);
              assert.isNotEmpty(res.royalty);
              assert.isNotEmpty(res.offchain);
            });
          },
          (err) => assert.fail(err.message)
        );
      },
      { sortable: Sortable.Asc }
    );
  });

  it.only('Get token info by mint address', async () => {
    await SplToken.findByMint(mint, (result) => {
      result.match(
        (ok) => {
          console.log(ok);
        },
        (err) => assert.fail(err.message)
      );
    });
  });
});
