import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Pubkey } from '../../../shared';
import { Find, OnErr, OnOk, Sortable, SplToken } from '../../src/';
import { UserSideOutput } from '@solana-suite/shared-metaplex';

let owner: Pubkey;
const nftMint = '5cjaV2QxSrZ3qESwsH49JmQqrcakThBZ9uZ5NVCcqzHt'; // nft
const mint = 'EFgwtsm4azvQcnRPhDZ8yV9we1A12PgecpJ3im79o4x3'; // token
const notFoundTokenOwner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT';
const onOk: OnOk<Find> = (ok) => {
  ok.forEach((res) => {
    assert.isNotEmpty(res.name);
    assert.isNotEmpty(res.mint);
    assert.isNotEmpty(res.symbol);
    assert.isNotEmpty(res.uri);
    assert.isNumber(res.royalty);
    assert.isNotEmpty(res.offchain);
    assert.isNotEmpty(res.tokenAmount);
  });
};

const onErr: OnErr = (err: Error) => assert.fail(err.message);

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    owner = obj.source.pubkey;
  });

  it('Not found token', (done) => {
    const onOk: OnOk<Find> = (ok) => assert.isArray(ok);
    const onErr: OnErr = (err) => assert.fail(err.message);
    SplToken.findByOwner(notFoundTokenOwner, onOk, onErr);
    done();
  });

  it('Get token info owned', (done) => {
    SplToken.findByOwner(
      owner,
      (ok: UserSideOutput.TokenMetadata[]) => {
        ok.forEach((res) => {
          assert.isNotEmpty(res.name);
          assert.isNotEmpty(res.mint);
          assert.isNotEmpty(res.symbol);
          assert.isNotEmpty(res.uri);
          assert.isNumber(res.royalty);
          assert.isNotEmpty(res.offchain);
          assert.isNotEmpty(res.tokenAmount);
        });
      },
      onErr
    );
    done();
  });

  it('Get token info owned with no Hold', (done) => {
    SplToken.findByOwner(owner, onOk, onErr, { isHolder: false });
    done();
  });

  it('Get token info owned with Asc', (done) => {
    SplToken.findByOwner(owner, onOk, onErr, { sortable: Sortable.Asc });
    done();
  });

  it('Get token info by mint address', async () => {
    (await SplToken.findByMint(mint)).match(
      (ok) => {
        assert.isNotEmpty(ok.name);
        assert.isNotEmpty(ok.mint);
        assert.isNotEmpty(ok.symbol);
        assert.isNotEmpty(ok.uri);
        assert.isNumber(ok.royalty);
        assert.isNotEmpty(ok.tokenAmount);
        assert.isNotEmpty(ok.offchain);
      },
      (err) => assert.fail(err.message)
    );
  });

  it('[Error]Get token info by mint address, but token standard is difierent', async () => {
    (await SplToken.findByMint(nftMint)).match(
      (ok) => assert.fail(`${ok}`),
      (err) => assert.isNotEmpty(err.message)
    );
  });
});
