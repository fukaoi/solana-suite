import test from 'ava';
import { CompressedNft } from '../src';
import { KeypairAccount, Pubkey } from '~/types/account';
import { Setup } from 'test-tools/setup';

let source: KeypairAccount;
let feePayer: KeypairAccount;
let mint: Pubkey;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  feePayer = obj.feePayer;
});

test.beforeEach(async (t) => {
  const assets = await CompressedNft.findByOwner(source.pubkey);
  if (assets.isErr) {
    t.fail(assets.error.message);
  }
  mint = assets.unwrap().metadatas[0].mint;
  t.log('# mint: ', mint);
});

test('Gas-less new delegate signer', async (t) => {
  const obj = await CompressedNft.gasLessDelegate(
    mint,
    source.secret,
    feePayer.pubkey,
  );

  (await obj.unwrap().submit(feePayer.secret)).match(
    (ok) => {
      t.log('# sig: ', ok);
      t.pass();
    },
    (err) => {
      console.error(err);
      t.fail(err.name);
    },
  );
});
