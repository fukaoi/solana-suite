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
  res.match(
    (ok) => {
      t.log('# findByOwner: ', ok);
      t.true(ok.page === 1);
      t.true(ok.total > 0);
      t.pass();
    },
    (err) => {
      t.fail(err.message);
    },
  );
});
