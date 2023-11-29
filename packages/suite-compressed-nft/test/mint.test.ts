import test from 'ava';
import { CompressedNft } from '../src';
import { Account } from '~/account';
import { KeypairAccount } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Pubkey } from '~/types/account';
import { InputCreators } from '~/types/regular-nft';
import { ValidatorError } from '~/validator';

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
  const inst = await CompressedNft.mint(
    source.pubkey,
    source.secret,
    {
      uri: 'https://ipfs.io/ipfs/bafkreibh6mv6zqvg2wopmtx3k4smavcfx55ob2pciuoob2z44acgtem754',
      name: asset.name!,
      description: asset.description,
      symbol: asset.symbol!,
      royalty: 50,
    },
    treeOwner,
    collectionMint,
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

test('[Arweave] mint nft', async (t) => {
  const asset = RandomAsset.get();
  const inst = await CompressedNft.mint(
    source.pubkey,
    source.secret,
    {
      filePath: asset.filePath as string,
      storageType: 'arweave',
      name: asset.name!,
      symbol: asset.symbol!,
      description: asset.description,
      royalty: 50,
      isMutable: true,
    },
    treeOwner,
    collectionMint,
  );

  (await inst.submit()).match(
    (ok: string) => {
      t.log('# sig:', ok);
      t.pass();
    },
    (ng: Error) => t.fail(ng.message),
  );
  const assetId = await inst.unwrap().data?.getAssetId();
  t.log('# asset id: ', assetId);
});

test('[Nft Storage] mint nft with fee payer', async (t) => {
  const asset = RandomAsset.get();
  const inst = await CompressedNft.mint(
    source.pubkey,
    source.secret,
    {
      filePath: asset.filePath,
      name: asset.name!,
      symbol: asset.symbol!,
      description: asset.description,
      royalty: 0,
    },
    treeOwner,
    collectionMint,
    { feePayer: feePayer.secret },
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

test('[Nft Storage] mint nft with many optional datas, verified collection', async (t) => {
  const asset = RandomAsset.get();
  const creators: InputCreators[] = [];
  const unverifyCreator = Account.Keypair.create();
  const receiver = Account.Keypair.create();

  creators.push({
    address: 'H7WEabRV8vvCJxK8forAUfeXunoYpWFbhewGj9eC4Pj8',
    secret:
      '4DRpsEkwfAMc7268urkNu2AFC4tweXTLJArwXG9LGvjqcFUoy9mqmBZHLhf2yHEbj3AgrjVppEBQ5hfBTnDzLVSA',
    share: 70,
  });

  creators.push({
    address: unverifyCreator.pubkey,
    secret: '',
    share: 30,
  });

  const properties = {
    files: [
      {
        filePath: asset.filePath,
        fileName: 'properties image',
        fileType: 'image/jpg',
      },
    ],
  };

  const collection = 'FMKm75Z9feXMrsKRT9Q6AqSrjHzFPYxpyrD4Hyfx4bup';

  const attributes = [
    {
      trait_type: 'hair',
      value: 'brown',
    },
    {
      trait_type: 'eye',
      value: 'blue',
    },
  ];

  const options = {
    github_url: 'https://github.com/atonoy/solana-suite',
    docs_url: 'https://solana-suite.gitbook.io/solana-suite-develpoment-guide/',
  };

  const inst = await CompressedNft.mint(
    source.pubkey,
    source.secret,
    {
      filePath: asset.filePath as string,
      name: asset.name!,
      symbol: asset.symbol!,
      description: asset.description,
      external_url: 'https://atonoy.github.io/solana-suite/',
      royalty: 50,
      isMutable: false,
      creators,
      properties,
      collection,
      attributes,
      options,
    },
    treeOwner,
    collectionMint,
    {
      feePayer: feePayer.secret,
      receiver: receiver.pubkey,
    },
  );

  (await inst.submit()).match(
    (ok: string) => {
      t.log('# sig:', ok);
      t.pass();
    },
    // (ng: Error) => .fail(ng.message),
    (ng: Error) => console.error(ng),
  );
  const assetId = await inst.unwrap().data?.getAssetId();
  t.log('# asset id: ', assetId);
});

test('[Error]Raise validation error when upload meta data', async (t) => {
  const inst = await CompressedNft.mint(
    source.pubkey,
    source.secret,
    {
      filePath: 'not found',
      name: '',
      symbol: 'LONG-SYMBOL-LONG',
      royalty: -100,
    },
    treeOwner,
    collectionMint,
  );

  inst.match(
    () => t.fail('Unrecognized error'),
    (err: Error) => {
      t.log((err as ValidatorError).details);
      t.not(err.message, '');
    },
  );
});
