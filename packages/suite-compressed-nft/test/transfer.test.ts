import test from 'ava';
import { CompressedNft } from '../src';
import { KeypairAccount } from '~/types/account';
import { Setup } from 'test-tools/setup';

let source: KeypairAccount;
let dest: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
});

test('Transfer nft', async (t) => {
  const assets = await CompressedNft.findByOwner(source.pubkey);

  if (assets.isErr) {
    t.fail(assets.error.message);
  }

  const mint = assets.unwrap().metadatas[0].mint;
  const res = await (
    await CompressedNft.transfer(
      mint,
      source.pubkey,
      dest.pubkey,
      [source.secret],
    )
  ).submit();

  res.match(
    (ok: string) => {
      t.log('# sig: ', ok);
      t.pass();
    },
    (err: Error) => {
      console.error(err);
      t.fail(err.message);
    },
  );
});
