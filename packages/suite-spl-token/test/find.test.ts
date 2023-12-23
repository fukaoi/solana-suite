import test from 'ava';
import { Setup } from 'test-tools/setup';
import { Pubkey } from '~/types/account';
import { SplToken } from '../src/';

let owner: Pubkey;
const nftMint = '5cjaV2QxSrZ3qESwsH49JmQqrcakThBZ9uZ5NVCcqzHt'; // nft
const mint = 'EFgwtsm4azvQcnRPhDZ8yV9we1A12PgecpJ3im79o4x3'; // token
const notFoundTokenOwner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT';

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  owner = obj.dest.pubkey;
});

test('Get token info owned', async (t) => {
  const res = await SplToken.findByOwner(owner);
  res.match(
    (ok) => {
      ok.forEach((ok) => {
        if (ok.tokenAmount == '1') {
          t.fail(`${ok.mint} is NFT`);
        }
        t.not(ok.name, '');
        t.not(ok.mint, '');
        t.not(ok.symbol, '');
        t.not(ok.uri, '');
        t.not(ok.royalty, '');
        t.not(ok.tokenAmount, '');
      });
    },
    (err) => {
      t.fail(err.message);
    },
  );
});

test('Get token info by mint address', async (t) => {
  const res = await SplToken.findByMint(mint);
  res.match(
    (ok) => {
      t.log(ok);
      t.not(ok.name, '');
      t.not(ok.mint, '');
      t.not(ok.symbol, '');
      t.not(ok.uri, '');
      t.not(ok.royalty, '');
      t.not(ok.tokenAmount, '');
      t.not(ok.offchain, '');
    },
    (err) => {
      t.fail(err.message);
    },
  );
});

test('[Error]Get token info by mint address', async (t) => {
  (await SplToken.findByMint(nftMint)).match(
    () => t.fail('Do not come here.'),
    (err: Error) => t.not(err.message, ''),
  );
});

test('[Error] No tokne owner ', async (t) => {
  (await SplToken.findByOwner(notFoundTokenOwner)).match(
    (ok) => t.true(ok.length === 0),
    (err) => t.fail(err.message),
  );
});
