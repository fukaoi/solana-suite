import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Metaplex } from '../../src/metaplex';
import { Find, OnErr, OnOk, Sortable } from '../../../core/src';
import { Setup } from '../../../shared/test/testSetup';
import { Pubkey } from '../../../shared';

let owner: Pubkey;
const notFoundTokenOwner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT';
const nftMint = '5cjaV2QxSrZ3qESwsH49JmQqrcakThBZ9uZ5NVCcqzHt'; // nft
const mint = 'EFgwtsm4azvQcnRPhDZ8yV9we1A12PgecpJ3im79o4x3'; // token

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

describe('Metaplex.find', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    owner = obj.source.pubkey;
  });

  it('Not found nft', (done) => {
    const onOk: OnOk<Find> = (ok) => assert.isArray(ok);
    const onErr: OnErr = (err) => assert.fail(err.message);
    Metaplex.findByOwner(notFoundTokenOwner, onOk, onErr);
    done();
  });

  it('Find owner info', (done) => {
    Metaplex.findByOwner(owner, onOk, onErr);
    done();
  });

  it('Find owner info with Asc', (done) => {
    Metaplex.findByOwner(owner, onOk, onErr, { sortable: Sortable.Asc });
    done();
  });

  it('Find owner info with no Hold', (done) => {
    Metaplex.findByOwner(owner, onOk, onErr, { isHolder: true });
    done();
  });

  it('Get token info by mint address', async () => {
    (await Metaplex.findByMint(nftMint)).match(
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
    (await Metaplex.findByMint(mint)).match(
      (ok) => assert.fail(`${ok}`),
      (err) => assert.isNotEmpty(err.message)
    );
  });
});
