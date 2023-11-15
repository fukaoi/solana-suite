import test from 'ava';
import { CompressedNft } from '../src';
import { KeypairAccount } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { Pubkey } from '~/types/account';

let source: KeypairAccount;
let collectionMint: Pubkey;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  collectionMint = obj.collectionMint;
});

test('Find metadata by owner', async (t) => {
  const res = await CompressedNft.findByOwner(source.pubkey);
  console.log(res);
  t.pass();
  // t.pass();
  // res.match(
  //   (ok) => {
  //     t.log('# page: ', ok.page);
  //     t.log('# total: ', ok.total);
  //     t.log('# limit: ', ok.limit);
  //     ok.items.forEach((item) => {
  //       console.log(item);
  //     });
  //     t.pass();
  //   },
  //   (err) => {
  //     t.fail(err.message);
  //   },
  // );
});
