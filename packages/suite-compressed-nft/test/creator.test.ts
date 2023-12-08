import test from 'ava';
import { CompressedNft } from '../src';
import { KeypairAccount } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Pubkey } from '~/types/account';

let source: KeypairAccount;
let feePayer: KeypairAccount;
let treeOwner: Pubkey;
let collectionMint: Pubkey;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  feePayer = obj.feePayer;
  treeOwner = obj.treeOwner;
  collectionMint = obj.collectionMint;
});

test('[nftStorage] mint nft, already uploaed image', async (t) => {
  const asset = RandomAsset.get();

  const creators = [
    {
      address: 'H7WEabRV8vvCJxK8forAUfeXunoYpWFbhewGj9eC4Pj8',
      secret: '',
      share: 100,
    },
  ];

  // creators.push({
  //   address: unverifyCreator.pubkey,
  //   secret: '',
  //   share: 30,
  // });

  const inst = await CompressedNft.createCreator(
    'g1HtzMSanhgBXahJfnzviDvm1JS3kPbA4Qm4p7PTXCJ',
    source.secret,
    {
      uri: 'https://ipfs.io/ipfs/bafkreibh6mv6zqvg2wopmtx3k4smavcfx55ob2pciuoob2z44acgtem754',
      name: asset.name!,
      description: asset.description,
      symbol: asset.symbol!,
      royalty: 50,
      creators,
    },
    feePayer.secret,
    treeOwner,
  );
  (await inst.submit()).match(
    async (ok: string) => {
      t.log('# sig:', ok);
      t.pass();
    },
    (ng: Error) => console.error(ng),
  );
  const assetId = await inst.unwrap().data?.getAssetId();
  t.log('# asset id: ', assetId);
});
