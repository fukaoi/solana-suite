import test from 'ava';
import { Setup } from 'test-tools/setup';
import { CompressedNft } from '../src';
import { KeypairAccount } from '~/types/account';
let source: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('Create collection', async (t) => {
  const inst = await CompressedNft.mintCollection(
    source.pubkey,
    source.secret,
    {
      name: 'CollectionNFT',
      symbol: 'CNFT',
      royalty: 0,
      uri: 'https://arweave.net/5dfVI6R6bjT241pEUsUHVa1uzSzu8tMUfs1tAnFwikk',
      storageType: 'nftStorage'
    },
  );
  (await inst.submit()).match(
    (ok) => {
      t.log('# sig: ', ok);
      t.pass();
    },
    (err) => {
      console.log(err);
      t.fail(err.message);
    },
  );
});
