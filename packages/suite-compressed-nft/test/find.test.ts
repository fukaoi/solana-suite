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

test('Find metadatas by owner', async (t) => {
  const res = await CompressedNft.findByOwner(source.pubkey);
  res.match(
    (ok) => {
      t.log('# findByOwner: ', ok);
      t.true(ok.page === 1);
      t.true(ok.total > 0);
      t.pass();
    },
    (err) => {
      console.error(err);
      t.fail(err.message);
    },
  );
});

test('Find metadata by mint', async (t) => {
  const mint = '31cNHDDcxcrjALjABXrRLoSWoDQnwi9KtVSSxfLuyDWw';
  const res = await CompressedNft.findByMint(mint);
  res.match(
    (ok) => {
      t.log('# findByMint: ', ok);
      t.not(ok.name, '');
      t.not(ok.offchain, undefined);
      t.pass();
    },
    (err) => {
      console.error(err);
      t.fail(err.message);
    },
  );
});

test.only('Find metadatas by collectionMint', async (t) => {
  const res = await CompressedNft.findByCollection(collectionMint);
  res.match(
    (ok) => {
      t.log('# findByCollection: ', ok);
      t.true(ok.page === 1);
      t.true(ok.total > 0);
      t.pass();
    },
    (err) => {
      console.error(err);
      t.fail(err.message);
    },
  );
});
