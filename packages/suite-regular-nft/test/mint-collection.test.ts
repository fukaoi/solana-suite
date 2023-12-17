import test from 'ava';
import { Setup } from 'test-tools/setup';
import { RegularNft } from '../src';
import { KeypairAccount } from '~/types/account';

let source: KeypairAccount;
let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  feePayer = obj.feePayer;
});

test('Create collection', async (t) => {
  const inst = await RegularNft.mintCollection(
    source.pubkey,
    source.secret,
    {
      name: 'CollectionNFT',
      symbol: 'CNFT',
      royalty: 0,
      uri: 'https://arweave.net/5dfVI6R6bjT241pEUsUHVa1uzSzu8tMUfs1tAnFwikk',
    },
    {
      feePayer: feePayer.secret,
    },
  );

  (await inst.submit()).match(
    (ok: string) => {
      t.log('# sig: ', ok);
      t.log('# collectionMint: ', inst.unwrap().data);
      t.pass();
    },
    (err: Error) => {
      console.log(err);
      t.fail(err.message);
    },
  );
});

test('Create collection with feePayer', async (t) => {
  const inst = await RegularNft.mintCollection(
    source.pubkey,
    source.secret,
    {
      name: 'CollectionNFT',
      symbol: 'CNFT',
      royalty: 0,
      uri: 'https://arweave.net/5dfVI6R6bjT241pEUsUHVa1uzSzu8tMUfs1tAnFwikk',
    },
    { feePayer: feePayer.secret, collectionSize: 100 },
  );

  (await inst.submit()).match(
    (ok: string) => {
      t.log('# sig: ', ok);
      t.log('# collectionMint: ', inst.unwrap().data);
      t.pass();
    },
    (err: Error) => {
      console.log(err);
      t.fail(err.message);
    },
  );
});
