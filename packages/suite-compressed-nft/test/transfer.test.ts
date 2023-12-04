import test from 'ava';
import { CompressedNft } from '../src';
import { Account } from '~/account';
import { KeypairAccount, Pubkey } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { SortBy, SortDirection } from '~/types/find';

let source: KeypairAccount;
let dest: KeypairAccount;
let mint: Pubkey;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
});

test.beforeEach(async (t) => {
  const assets = await CompressedNft.findByOwner(source.pubkey, {
    sortBy: {
      sortBy: SortBy.Recent,
      sortDirection: SortDirection.Asc,
    },
  });

  if (assets.isErr) {
    console.error(assets);
    t.fail(assets.error.message);
  } else if (assets.isOk && assets.value.metadatas.length < 1) {
    t.fail('Your assets is empty');
  }
  mint = assets.unwrap().metadatas[0].mint;
  t.log('# mint: ', mint);
});

test('Transfer nft', async (t) => {
  const res = await (
    await CompressedNft.transfer(mint, source.pubkey, dest.pubkey, [
      source.secret,
    ])
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

test('Transfer nft with fee payer', async (t) => {
  const res = await (
    await CompressedNft.transfer(mint, source.pubkey, dest.pubkey, [
      source.secret,
    ])
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

test('[Error] No match owner', async (t) => {
  const noMatchDelegate = Account.Keypair.create();
  const serialized = await CompressedNft.transfer(
    mint,
    noMatchDelegate.pubkey,
    dest.pubkey,
    [noMatchDelegate.secret],
  );

  t.true(serialized.isErr);
});
