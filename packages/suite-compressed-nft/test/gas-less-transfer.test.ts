import test from 'ava';
import { CompressedNft } from '../src';
import { KeypairAccount } from '~/types/account';
import { Setup } from 'test-tools/setup';

let source: KeypairAccount;
let dest: KeypairAccount;
let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
  feePayer = obj.feePayer;
});

test('Gas-Less Transfer nft', async (t) => {
  const assets = await CompressedNft.findByOwner(source.pubkey);

  if (assets.isErr) {
    console.error(assets);
    t.fail(assets.error.message);
  } else if (assets.isOk && assets.value.metadatas.length < 1) {
    t.fail('Your assets is empty');
  }

  const mint = assets.unwrap().metadatas[0].mint;
  t.log('# mint: ', mint);

  const serialized = await CompressedNft.gasLessTransfer(
    mint,
    source.secret,
    dest.pubkey,
    feePayer.pubkey,
  );

  const res = await serialized.unwrap().submit(feePayer.secret);
  res.match(
    (ok) => {
      t.log('# tx signature: ', ok);
      t.pass();
    },
    (err) => {
      console.error(err);
      t.fail(err.message);
    },
  );
});
