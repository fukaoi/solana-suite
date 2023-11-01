import test from 'ava';
import { Setup } from 'test-tools/setup';
import { Pubkey } from '~/types/account';
import { Sortable } from '~/types/find';
import { OnErr, OnOk } from '~/types/shared';
import { NftMetadata } from '~/types/regular-nft';
import { promisify } from 'node:util';
import { sleep } from '../../shared/src/shared';
import { RegularNft } from '../src/';

let owner: Pubkey;
const notFoundTokenOwner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT';
const nftMint = '5cjaV2QxSrZ3qESwsH49JmQqrcakThBZ9uZ5NVCcqzHt'; // nft
const mint = 'EFgwtsm4azvQcnRPhDZ8yV9we1A12PgecpJ3im79o4x3'; // token

/* eslint-disable */
const withCallback = (fn: any) => async (t: any) => {
  await promisify(fn)(t);
  t.pass();
};

// not use t.log, because it is buffering

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  owner = obj.source.pubkey;
});

test(
  'Not found nft',
  withCallback((t: any, end: any) => {
    const onOk: OnOk<NftMetadata> = (ok) =>
      t.true(Array.isArray(ok));
    end();
    const onErr: OnErr = (err) => t.fail(err.message);
    RegularNft.findByOwner(notFoundTokenOwner, onOk, onErr);
  }),
);

test(
  'Find owner info',
  withCallback((t: any, end: any) => {
    const onOk: OnOk<NftMetadata> = async (ok) => {
      ok.forEach((res) => {
        t.not(res.name, '');
        t.not(res.mint, '');
        t.not(res.symbol, '');
        t.not(res.uri, '');
        t.is(typeof res.royalty, 'number');
        t.not(res.offchain, '');
        t.not(res.tokenAmount, '');
      });
      if (ok.length > 5 || (await sleep(10)) > 0) {
        end();
      }
    };
    const onErr: OnErr = (err: Error) => t.fail(err.message);
    RegularNft.findByOwner(owner, onOk, onErr);
  }),
);

test(
  'Find owner info with Asc',
  withCallback((t: any, end: any) => {
    const onOk: OnOk<NftMetadata> = async (ok) => {
      ok.forEach((res) => {
        t.not(res.name, '');
        t.not(res.mint, '');
        t.not(res.symbol, '');
        t.not(res.uri, '');
        t.is(typeof res.royalty, 'number');
        t.not(res.offchain, '');
        t.not(res.tokenAmount, '');
      });
      if (ok.length > 5 || (await sleep(10)) > 0) {
        end();
      }
    };
    const onErr: OnErr = (err: Error) => t.fail(err.message);
    RegularNft.findByOwner(owner, onOk, onErr, { sortable: Sortable.Asc });
  }),
);

test(
  'Find owner info with no Hold',
  withCallback((t: any, end: any) => {
    const onOk: OnOk<NftMetadata> = async (ok) => {
      ok.forEach((res) => {
        t.not(res.name, '');
        t.not(res.mint, '');
        t.not(res.symbol, '');
        t.not(res.uri, '');
        t.is(typeof res.royalty, 'number');
        t.not(res.offchain, '');
        t.not(res.tokenAmount, '');
      });
      if (ok.length > 5 || (await sleep(10)) > 0) {
        end();
      }
    };
    const onErr: OnErr = (err: Error) => t.fail(err.message);

    RegularNft.findByOwner(owner, onOk, onErr, { isHolder: true });
  }),
);

test('Get token info by mint address', async (t) => {
  (await RegularNft.findByMint(nftMint)).match(
    (ok: NftMetadata) => {
      t.not(ok.name, '');
      t.not(ok.mint, '');
      t.not(ok.symbol, '');
      t.not(ok.uri, '');
      t.not(ok.royalty, '');
      t.not(ok.tokenAmount, '');
      t.not(ok.offchain, '');
    },
    (err: Error) => t.fail(err.message),
  );
});

test('[Error]Get token info by mint address, but token standard is difierent', async (t) => {
  (await RegularNft.findByMint(mint)).match(
    () => t.fail('Dont come here'),
    (err: Error) => t.not(err.message, ''),
  );
});
