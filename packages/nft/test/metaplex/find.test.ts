import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Metaplex } from '../../src/metaplex';
import { Sortable } from '../../../core/src';
import { Setup } from '../../../shared/test/testSetup';
import { Pubkey } from '../../../shared';

let owner: Pubkey;
const notFoundTokenOwner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT';
describe('Metaplex.find', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    owner = obj.source.pubkey;
  });

  it('Not found nft', async () => {
    await Metaplex.findByOwner(notFoundTokenOwner, (result) => {
      assert.isTrue(result.isOk);
      assert.isArray(result.unwrap());
    });
  });

  it('Find owner info', async () => {
    await Metaplex.findByOwner(owner, (result) => {
      result.match(
        (ok) => {
          ok.forEach((res) => {
            assert.isNotEmpty(res.name);
            assert.isNotEmpty(res.mint);
            assert.isNotEmpty(res.symbol);
            assert.isNotEmpty(res.uri);
            assert.isNotEmpty(res.royalty);
            assert.isNotEmpty(res.offchain);
            assert.isNotEmpty(res.isMutable);
            assert.isNotEmpty(res.primarySaleHappened);
            assert.isNotEmpty(res.updateAuthority);
            assert.isNotEmpty(res.editionNonce);
          });
        },
        (err) => assert.fail(err.message)
      );
    });
  });

  it('Find owner info with Asc', async () => {
    await Metaplex.findByOwner(
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
              assert.isNotEmpty(res.isMutable);
              assert.isNotEmpty(res.primarySaleHappened);
              assert.isNotEmpty(res.updateAuthority);
              assert.isNotEmpty(res.editionNonce);
            });
          },
          (err) => assert.fail(err.message)
        );
      },
      { sortable: Sortable.Asc }
    );
  });

  it('Find owner info with no Hold', async () => {
    await Metaplex.findByOwner(
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
              assert.isNotEmpty(res.isMutable);
              assert.isNotEmpty(res.primarySaleHappened);
              assert.isNotEmpty(res.updateAuthority);
              assert.isNotEmpty(res.editionNonce);
            });
          },
          (err) => assert.fail(err.message)
        );
      },
      { isHolder: true }
    );
  });
});
