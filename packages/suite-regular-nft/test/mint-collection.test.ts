import test from 'ava';
import { Setup } from 'test-tools/setup';
import { RegularNft } from '../src';
import { KeypairAccount } from '~/types/account';
import { CollectionAccounts } from '../../types/src/regular-nft/collection';
let source: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('Create collection', async (t) => {
  const inst = await RegularNft.mintCollection(source.pubkey, source.secret, {
    name: 'CollectionNFT',
    symbol: 'CNFT',
    royalty: 0,
    uri: 'https://arweave.net/5dfVI6R6bjT241pEUsUHVa1uzSzu8tMUfs1tAnFwikk',
    storageType: 'nftStorage',
  });
  (await inst.submit()).match(
    (ok) => {
      const collectionAccounts = (inst.unwrap().data as CollectionAccounts)
      t.log('# sig: ', ok);
      t.log('# collectionMint: ', collectionAccounts.collectionMint);
      t.log('# collectionAuthority: ', collectionAccounts.collectionAuthority);
      t.log('# collectionMetadata: ', collectionAccounts.collectionMetadata);
      t.pass();
    },
    (err) => {
      console.log(err);
      t.fail(err.message);
    },
  );
});
