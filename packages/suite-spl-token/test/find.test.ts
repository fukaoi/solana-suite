import test from 'ava';
import { Setup } from 'test-tools/setup';
import { Pubkey } from '~/types/account';
import { SplToken } from '../src/';
import { Sortable } from '~/types/find';
import { OnErr, OnOk } from '~/types/shared';
import { UserSideOutput } from '~/types/converter';
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

test(
  'Not found token',
  withCallback((t: any, end: any) => {
    const onOk: OnOk<UserSideOutput.TokenMetadata> = (ok) => {
      t.true(Array.isArray(ok));
      end();
    };
    const onErr: OnErr = (err) => t.fail(err.message);
    SplToken.findByOwner(notFoundTokenOwner, onOk, onErr);
  }),
);

test(
  'Get token info owned',
  withCallback(async (t: any, end: any) => {
    const onErr: OnErr = (err: Error) => t.fail(err.message);
    SplToken.findByOwner(
      owner,
      (ok: UserSideOutput.TokenMetadata[]) => {
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
      },
      onErr,
    );
    await sleep(2);
    end();
  }),
);

test(
  'Get token info owned with no Hold',
  withCallback(async (t: any, end: any) => {
    const onOk: OnOk<UserSideOutput.TokenMetadata> = async (ok) => {
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
    };
    const onErr: OnErr = (err: Error) => t.fail(err.message);
    SplToken.findByOwner(owner, onOk, onErr, { isHolder: false });
    await sleep(2);
    end();
  }),
);

test(
  'Get token info owned with Asc',
  withCallback(async (t: any, end: any) => {
    const onOk: OnOk<UserSideOutput.TokenMetadata> = (ok) => {
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
    };
    const onErr: OnErr = (err: Error) => t.fail(err.message);
    SplToken.findByOwner(owner, onOk, onErr, { sortable: Sortable.Asc });
    await sleep(2);
    end();
  }),
);

test(
  'Get token info by mint address',
  withCallback(async (t: any, end: any) => {
    (await SplToken.findByMint(mint)).match(
      (ok: UserSideOutput.TokenMetadata) => {
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
    await sleep(2);
    end();
  }),
);

test('[Error]Get token info by mint address, but token standard is difierent', async (t) => {
  (await SplToken.findByMint(nftMint)).match(
    () => t.fail('Do not come here.'),
    (err: Error) => t.not(err.message, ''),
  );
});
