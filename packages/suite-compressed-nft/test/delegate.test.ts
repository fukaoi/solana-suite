import test from 'ava';
import { CompressedNft } from '../src';
import { KeypairAccount, Pubkey } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { SortBy, SortDirection } from '~/types/find';

let source: KeypairAccount;
let mint: Pubkey;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test.beforeEach(async (t) => {
  const assets = await CompressedNft.findByOwner(source.pubkey, {
    // sortBy: {
    //   sortBy: SortBy.Recent,
    // sortDirection: SortDirection.Asc,
    // },
  });
  if (assets.isErr) {
    t.fail(assets.error.message);
  }
  mint = assets.unwrap().metadatas[0].mint;
  t.log('# mint: ', mint);
});

test('Set new delegate signer', async (t) => {

  const res = await (
    await CompressedNft.setDelegate(mint, source.secret)
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
