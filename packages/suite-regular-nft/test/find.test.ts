import test from 'ava';
import { RegularNft } from '../src';
import { KeypairAccount } from '~/types/account';
import { Setup } from 'test-tools/setup';

let source: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('Find metadatas by owner', async (t) => {
  const res = await RegularNft.findByOwner(source.pubkey);
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
  const mint = 'FMKm75Z9feXMrsKRT9Q6AqSrjHzFPYxpyrD4Hyfx4bup';
  const res = await RegularNft.findByMint(mint);
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

test('No match mint', async (t) => {
  const mint = 'GdF775ANoyvNwqHTApTKAiEgnkzMgXsrVFVSjy6ivK7P';
  const res = await RegularNft.findByMint(mint);
  t.not({}, res);
});

test('Find metadatas by collectionMint', async (t) => {
  const collectionMint = '97DThuwju7sAfkEupra24KRW2EyXVxaqoXDpfQbHFTh8';
  const res = await RegularNft.findByCollection(collectionMint);
  t.not([], res.unwrap().metadatas);
});
