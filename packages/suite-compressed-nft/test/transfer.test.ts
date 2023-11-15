import test from 'ava';
import { CompressedNft, Node } from '../src';
import { KeypairAccount } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Pubkey } from '~/types/account';
import { sleep } from '../../shared/src/shared';

let source: KeypairAccount;
let dest: KeypairAccount;
let collectionMint: Pubkey;
let treeOwner: Pubkey;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
  collectionMint = obj.collectionMint;
  treeOwner = obj.treeOwner;
});

test('Transfer nft', async (t) => {
  const asset = RandomAsset.get();

  const creator = {
    address: '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk',
    share: 100,
    secret: '',
  };

  const instMint = await CompressedNft.mint(
    source.pubkey,
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
    treeOwner,
    collectionMint,
  );

  let assetId;
  (await instMint.submit()).match(
    async (ok) => {
      await Node.confirmedSig(ok);
      assetId = await instMint.unwrap().data?.getAssetId();
    },
    (err) => {
      t.fail(err.message);
    },
  );

  // want to get new asset id
  await sleep(2);
  console.log('# assetId: ', assetId);

  const res = await (
    await CompressedNft.transfer(
      assetId!,
      source.pubkey,
      dest.pubkey,
      source.secret,
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
