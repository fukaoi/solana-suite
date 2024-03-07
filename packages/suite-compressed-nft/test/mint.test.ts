import test from 'ava';
import { CompressedNft } from '../src';
import { Account } from '~/account';
import { Node } from '~/node';
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
  const name = 'Red tailed Hawk';
  const inst = await CompressedNft.mint(
    source.secret,
    {
      uri: 'https://gateway.irys.xyz/wilNVxxU8pdlmFQtuCyAb9C3PGJel_E2EeMP6WiyLdg',
      name,
      description: asset.description,
      symbol: asset.symbol!,
      royalty: 50,
    },
    treeOwner,
    collectionMint,
  );
  await (
    await inst.submit()
  ).match(
    async (ok: string) => {
      t.log('# sig:', ok);
      t.pass();
      await Node.confirmedSig(ok);
    },
    (ng: Error) => console.error(ng),
  );
  const assetId = await inst.unwrap().data?.getAssetId();
  t.log('# name: ', name);
  t.log('# mint: ', assetId);
});

test('[Arweave] mint nft', async (t) => {
  const asset = RandomAsset.get();
  const name = 'White Horse';
  const inst = await CompressedNft.mint(
    source.secret,
    {
      uri: 'https://gateway.irys.xyz/hnB5_PG7kb1V2Hvghjf2STDgfstSteOSDgH3YDx5yvA',
      name,
      storageType: 'arweave',
      symbol: asset.symbol!,
      description: asset.description,
      royalty: 50,
      isMutable: true,
    },
    treeOwner,
    collectionMint,
  );

  await (
    await inst.submit()
  ).match(
    async (ok: string) => {
      t.log('# sig:', ok);
      t.pass();
      await Node.confirmedSig(ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
  const assetId = await inst.unwrap().data?.getAssetId();
  t.log('# name: ', name);
  t.log('# mint: ', assetId);
});

test('[Nft Storage] mint nft with fee payer', async (t) => {
  const asset = RandomAsset.get();
  const name = 'Yellow Fox';
  const inst = await CompressedNft.mint(
    source.secret,
    {
      uri: 'https://devnet.irys.xyz/xldM3MgbuNCKd5eEB0IV1fQe0qk14tTjGVylNaOj0nY',
      name,
      symbol: asset.symbol!,
      description: asset.description,
      royalty: 0,
    },
    treeOwner,
    collectionMint,
    { feePayer: feePayer.secret },
  );

  await (
    await inst.submit()
  ).match(
    async (ok: string) => {
      t.log('# sig:', ok);
      t.pass();
      await Node.confirmedSig(ok);
    },
    (ng: Error) => console.error(ng),
  );

  const assetId = await inst.unwrap().data?.getAssetId();
  t.log('# name: ', name);
  t.log('# mint: ', assetId);
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

  const name = 'Brown Dog';
  const inst = await CompressedNft.mint(
    source.secret,
    {
      uri: 'https://ipfs.io/ipfs/bafybeifxfy4r2p77pgibc2eq66jp7n4qdc7xwqjunx4oi4ndpekc3eg4yy',
      name,
      symbol: asset.symbol!,
      description: asset.description,
      external_url: 'https://atonoy.github.io/solana-suite/',
      royalty: 50,
      isMutable: false,
      // creators,
      properties,
      collection: collectionMint,
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

  await (
    await inst.submit()
  ).match(
    async (ok: string) => {
      t.log('# sig:', ok);
      t.pass();
      await Node.confirmedSig(ok);
    },
    (ng: Error) => {
      console.error(ng);
      t.fail(ng.message);
    },
  );
  const assetId = await inst.unwrap().data?.getAssetId();
  t.log('# name: ', name);
  t.log('# mint: ', assetId);
});

test.skip('[Error]Raise validation error when upload meta data', async (t) => {
  const inst = await CompressedNft.mint(
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
