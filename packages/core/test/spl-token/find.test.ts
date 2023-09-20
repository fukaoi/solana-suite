import { beforeAll, describe, expect, it } from '@jest/globals';
import { Setup } from '../../../shared/test/testSetup';
import { Pubkey } from '../../../shared';
import {
  Find,
  OnErr,
  OnOk,
  Sortable,
  SplToken,
  TokenMetadata,
} from '../../src/';

let owner: Pubkey;
const nftMint = '5cjaV2QxSrZ3qESwsH49JmQqrcakThBZ9uZ5NVCcqzHt'; // nft
const mint = 'EFgwtsm4azvQcnRPhDZ8yV9we1A12PgecpJ3im79o4x3'; // token
const notFoundTokenOwner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT';
const onOk: OnOk<Find> = (ok) => {
  ok.forEach((res) => {
    expect(JSON.stringify(res)).not.toBe('{}');
    expect(typeof res.royalty).toBe('number');
  });
};

const onErr: OnErr = (err: Error) => {
  console.error('# error: ', err);
  expect(false).toBe(true);
};

describe('SplToken', () => {
  beforeAll(async () => {
    const obj = await Setup.generateKeyPair();
    owner = obj.source.pubkey;
  });

  it('Not found token', (done) => {
    const onOk: OnOk<Find> = (ok) => expect(Array.isArray(ok)).toBe(true);
    SplToken.findByOwner(notFoundTokenOwner, onOk, onErr);
    done();
  });

  it('Get token info owned', (done) => {
    SplToken.findByOwner(
      owner,
      (ok: TokenMetadata[]) => {
        ok.forEach((res) => {
          expect(JSON.stringify(res)).not.toBe('{}');
          expect(typeof res.royalty).toBe('number');
        });
      },
      onErr,
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
    (await SplToken.findByMint(mint)).match((ok: {}) => {
      expect(JSON.stringify(ok)).not.toBe('{}');
    }, onErr);
  });

  it('[Error]Get token info by mint address, but token standard is difierent', async () => {
    (await SplToken.findByMint(nftMint)).match(
      (ok: {}) => {
        console.log('# No pass through:', ok);
        expect(false).toBe(true);
      },
      (err: Error) => expect(err.message).not.toBe(''),
    );
  });
});
