import test from 'ava';
import { RegularNft } from '../src';
import { KeypairAccount } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Pubkey } from '~/types/account';

let source: KeypairAccount;
let dest: KeypairAccount;
let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
  feePayer = obj.feePayer;
});

test('Transfer nft', async (t) => {
  const asset = RandomAsset.get();

  const creator = {
    address: '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk',
    share: 100,
    secret: '',
  };

  const mint = await RegularNft.mint(
    source.secret,
    {
      filePath: asset.filePath as string,
      storageType: 'arweave',
      name: asset.name!,
      symbol: asset.symbol!,
      royalty: 50,
      creators: [creator],
      isMutable: true,
    },
    { feePayer: feePayer.secret },
  );

  const resMint = await mint.submit();

  if (resMint.isErr) {
    t.fail(resMint.error.message);
  }
  const res = await (
    await RegularNft.transfer(
      mint.unwrap().data as Pubkey,
      source.pubkey,
      dest.pubkey,
      [source.secret],
      { feePayer: feePayer.secret },
    )
  ).submit();

  res.match(
    (ok: string) => {
      t.log('# mint: ', mint.unwrap().data);
      t.log('# sig: ', ok);
      t.pass();
    },
    (err: Error) => {
      t.fail(err.message);
    },
  );
});
