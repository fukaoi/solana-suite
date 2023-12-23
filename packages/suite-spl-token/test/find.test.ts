import test from 'ava';
import { Setup } from 'test-tools/setup';
import { Pubkey } from '~/types/account';
import { SplToken } from '../src/';
import { OnErr, OnOk } from '~/types/shared';
import { TokenMetadata } from '~/types/spl-token';
import { sleep } from '../../shared/src/shared';

let owner: Pubkey;
const nftMint = '5cjaV2QxSrZ3qESwsH49JmQqrcakThBZ9uZ5NVCcqzHt'; // nft
const mint = 'EFgwtsm4azvQcnRPhDZ8yV9we1A12PgecpJ3im79o4x3'; // token
const notFoundTokenOwner = '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFT';

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  // owner = obj.source.pubkey;
  owner = obj.dest.pubkey;
});

// test(
//   'Not found token',
//   withCallback((t: any, end: any) => {
//     const onOk: OnOk<TokenMetadata> = (ok) => {
//       t.true(Array.isArray(ok));
//       end();
//     };
//     const onErr: OnErr = (err) => t.fail(err.message);
//     SplToken.findByOwner(notFoundTokenOwner, onOk, onErr);
//   }),
// );

test('Get token info owned with no Hold', async (t) => {
  const res = await SplToken.findByOwner(owner);
  console.log(res);
  t.pass();
});

// test('Get token info by mint address', async (t) => {
//   (await SplToken.findByMint(mint)).match(
//     (ok: TokenMetadata) => {
//       t.log(ok);
//       t.not(ok.name, '');
//       t.not(ok.mint, '');
//       t.not(ok.symbol, '');
//       t.not(ok.uri, '');
//       t.not(ok.royalty, '');
//       t.not(ok.tokenAmount, '');
//       t.not(ok.offchain, '');
//     },
//     (err: Error) => t.fail(err.message),
//   );
// });
//
// test('[Error]Get token info by mint address, but token standard is difierent', async (t) => {
//   (await SplToken.findByMint(nftMint)).match(
//     () => t.fail('Do not come here.'),
//     (err: Error) => t.not(err.message, ''),
//   );
// });
