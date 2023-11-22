import test from 'ava';
import { Setup } from 'test-tools/setup';
import { Pubkey } from '~/types/account';
import { SplToken } from '../src/';
import { SortDirection } from '~/types/find';
import { OnErr, OnOk } from '~/types/shared';
import { TokenMetadata } from '~/types/spl-token';
import { promisify } from 'node:util';
import { sleep } from '../../shared/src/shared';

let owner: Pubkey;
const nftMint = '5cjaV2QxSrZ3qESwsH49JmQqrcakThBZ9uZ5NVCcqzHt'; // nft
const mint = 'EFgwtsm4azvQcnRPhDZ8yV9we1A12PgecpJ3im79o4x3'; // token
const notFoundTokenOwner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT';

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  owner = obj.source.pubkey;
});

/* eslint-disable */
const withCallback = (fn: any) => async (t: any) => {
  await promisify(fn)(t);
  t.pass();
};

// not use t.log, because it is buffering

test(
  'Not found token',
  withCallback((t: any, end: any) => {
    const onOk: OnOk<TokenMetadata> = (ok) => {
      t.true(Array.isArray(ok));
      end();
    };
    const onErr: OnErr = (err) => t.fail(err.message);
    SplToken.findByOwner(notFoundTokenOwner, onOk, onErr);
  }),
);

test(
  'Get token info owned with no Hold',
  withCallback(async (t: any, end: any) => {
    const onOk: OnOk<TokenMetadata> = async (ok) => {
      t.log(ok);
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
    SplToken.findByOwner(owner, onOk, onErr, { isHolder: false });
  }),
);

test(
  'Get token info owned with Asc',
  withCallback((t: any, end: any) => {
    const onOk: OnOk<TokenMetadata> = async (ok) => {
      t.log(ok);
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
    SplToken.findByOwner(owner, onOk, onErr, {
      sortDirection: SortDirection.Asc,
    });
  }),
);

test('Get token info by mint address', async (t) => {
  (await SplToken.findByMint(mint)).match(
    (ok: TokenMetadata) => {
      t.log(ok);
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
  (await SplToken.findByMint(nftMint)).match(
    () => t.fail('Do not come here.'),
    (err: Error) => t.not(err.message, ''),
  );
});
