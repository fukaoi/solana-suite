import test from 'ava';
import { CompressedNft } from '../src';
import { Account } from '~/account';
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

test('Fee-Less Transfer nft', async (t) => {
  const assets = await CompressedNft.findByOwner(source.pubkey);

  if (assets.isErr) {
    t.fail(assets.error.message);
  }

  const mint = assets.unwrap().metadatas[0].mint;
  t.log('# mint: ', mint);

  const serialized = await CompressedNft.gasLessTransfer(
    mint,
    source.pubkey,
    dest.pubkey,
    feePayer.pubkey,
  );

  t.true(serialized.isOk, `${serialized.unwrap()}`);

  if (serialized.isOk) {
    const res = await serialized.value.submit(feePayer.secret);
    t.true(res.isOk, `${res.unwrap()}`);
    t.log('# tx signature: ', res.unwrap());
  }
});

test('[Error] No match delegate(or feePayer)', async (t) => {
  const assets = await CompressedNft.findByOwner(source.pubkey);
  const noMatchDelegate = Account.Keypair.create();

  if (assets.isErr) {
    t.fail(assets.error.message);
  }

  const mint = assets.unwrap().metadatas[0].mint;
  t.log('# mint: ', mint);

  const serialized = await CompressedNft.gasLessTransfer(
    mint,
    source.pubkey,
    dest.pubkey,
    noMatchDelegate.pubkey,
  );

  t.true(serialized.isErr);
});
