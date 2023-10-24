import test from 'ava';
import { RegularNft } from '../src';
import { KeypairAccount } from '~/account';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Pubkey } from '~/types/account';

let source: KeypairAccount;
let dest: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
});

test('Transfer nft', async (t) => {
  const asset = RandomAsset.get();

  const creator1 = {
    address: source.pubkey,
    share: 70,
    verified: true,
  };

  const creator2 = {
    address: '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk',
    share: 30,
    verified: false,
  };

  const mint = await RegularNft.mint(source.pubkey, source.secret, {
    filePath: asset.filePath as string,
    storageType: 'arweave',
    name: asset.name!,
    symbol: asset.symbol!,
    royalty: 50,
    creators: [creator1, creator2],
    isMutable: true,
  });

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
