import test from 'ava';
import { RegularNft } from '../src';
import { Account } from '~/account';
import { KeypairAccount } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Pubkey } from '~/types/account';
import { InputCreators } from '~/types/regular-nft';
import { ValidatorError } from '~/validator';

let source: KeypairAccount;
let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  feePayer = obj.feePayer;
});

test.only('[Arweave] mint nft with fee payer', async (t) => {
  const asset = RandomAsset.get();
  const animation_url =
    'http://ipfs.io/ipfs/bafybeif6mgmbluue73ch5en5ujfhtxg3xbitforwiydqcy6ork5st6gysu';
  const res = await RegularNft.mint(
    source.secret,
    {
      filePath: asset.filePath as string,
      animation_url,
      storageType: 'arweave',
      name: asset.name!,
      symbol: asset.symbol!,
      royalty: 50,
      description: asset.description,
      isMutable: true,
      properties: {
        category: 'video',
        files: [
          {
            type: 'video/mp4',
            uri: animation_url,
          },
        ],
      },
    },
    {
      feePayer: feePayer.secret,
    },
  );

  t.true(Account.Keypair.isPubkey(res.unwrap().data as Pubkey));

  (await res.submit()).match(
    (ok: string) => {
      t.log('# mint:', res.unwrap().data);
      t.log('# sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});

test('[Filebase] mint nft with fee payer', async (t) => {
  const owner = Account.Keypair.create();
  const asset = RandomAsset.get();
  const res = await RegularNft.mint(
    owner.secret,
    {
      filePath: asset.filePath as string,
      name: asset.name!,
      symbol: asset.symbol!,
      description: asset.description,
      royalty: 0,
    },
    {
      feePayer: feePayer.secret,
    },
  );

  t.true(Account.Keypair.isPubkey(res.unwrap().data as Pubkey));

  (await res.submit()).match(
    (ok: string) => {
      t.log('# mint:', res.unwrap().data);
      t.log('# sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});

test('[Filebase] mint nft with many optional datas, verified collection', async (t) => {
  const asset = RandomAsset.get();
  const creators: InputCreators[] = [];
  const unverifyCreator = Account.Keypair.create();
  const owner = source;
  const freezeAuthority = Account.Keypair.create();

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
    github_url: 'https://github.com/fukaoi/solana-suite',
    docs_url: 'https://solana-suite.gitbook.io/solana-suite-develpoment-guide/',
  };

  const res = await RegularNft.mint(
    owner.secret,
    {
      filePath: asset.filePath as string,
      name: asset.name!,
      description: asset.description,
      symbol: asset.symbol!,
      royalty: 50,
      isMutable: true,
      creators,
      properties,
      // collection,  // too many transaction size
      attributes,
      options,
    },
    {
      feePayer: feePayer.secret,
      freezeAuthority: freezeAuthority.pubkey,
    },
  );

  const mint = res.unwrap().data as Pubkey;
  (await res.submit()).match(
    (ok: string) => {
      t.true(Account.Keypair.isPubkey(mint));
      t.log('# mint:', mint);
      t.log('# sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});

test('[Error]Raise validation error when upload meta data', async (t) => {
  const res = await RegularNft.mint(source.secret, {
    filePath: '',
    name: '',
    symbol: 'LONG-SYMBOL-LONG',
    royalty: -100,
  });

  res.match(
    () => t.fail('Unrecognized error'),
    (err: Error) => {
      t.not(err.message, '');
      t.log((err as ValidatorError).details);
    },
  );
});
