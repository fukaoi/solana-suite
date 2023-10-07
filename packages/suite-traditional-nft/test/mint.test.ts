import test from 'ava';
import { TraditionalNft } from '../src';
import { KeypairAccount } from '~/account';
import { UserSideInput } from '~/types/converter';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Pubkey } from '~/types/account';
import { ValidatorError } from '~/validator';

let source: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('[Arweave] mint nft', async (t) => {
  const asset = RandomAsset.get();
  const res = await TraditionalNft.mint(source.pubkey, source.secret, {
    filePath: asset.filePath as string,
    storageType: 'arweave',
    name: asset.name!,
    symbol: asset.symbol!,
    royalty: 50,
    isMutable: true,
  });

  t.true(KeypairAccount.isPubkey(res.unwrap().data as Pubkey));

  (await res.submit()).match(
    (ok: string) => {
      console.log('# mint:', res.unwrap().data);
      console.log('# sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});

test('[Nft Storage] mint nft with fee payer', async (t) => {
  const owner = KeypairAccount.create();
  const asset = RandomAsset.get();
  const res = await TraditionalNft.mint(
    owner.pubkey,
    owner.secret,
    {
      filePath: asset.filePath as string,
      storageType: 'nftStorage',
      name: asset.name!,
      symbol: asset.symbol!,
      royalty: 0,
    },
    source.secret,
  );

  t.true(KeypairAccount.isPubkey(res.unwrap().data as Pubkey));

  (await res.submit()).match(
    (ok: string) => {
      console.log('# mint:', res.unwrap().data);
      console.log('# sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});

test('[Nft Storage] mint nft with many optional datas', async (t) => {
  const asset = RandomAsset.get();
  const creators: UserSideInput.Creators[] = [];
  const owner = KeypairAccount.create();
  const freezeAuthority = KeypairAccount.create();

  creators.push({
    address: owner.pubkey,
    share: 60,
    verified: false,
  });

  creators.push({
    address: 'G2Fjvm2ab1xxwMxLPFRSmuEDcX8jzsg2L1gFK4MKMkt5',
    share: 40,
    verified: false,
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

  const collection = 'F2g4RRH4J7DiZd17idZcBkuTDonVeJEveTdzwXdGHUue';

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

  const res = await TraditionalNft.mint(
    owner.pubkey,
    owner.secret,
    {
      filePath: asset.filePath as string,
      storageType: 'nftStorage',
      name: asset.name!,
      symbol: asset.symbol!,
      royalty: 50,
      creators,
      properties,
      collection,
      attributes,
      options,
    },
    source.secret,
    freezeAuthority.pubkey,
  );

  (await res.submit()).match(
    (ok: string) => {
      const mint = res.unwrap().data as Pubkey;
      t.true(KeypairAccount.isPubkey(mint));
      console.log('# mint:', mint);
      console.log('# sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});

test('[Error]Raise validation error when upload meta data', async (t) => {
  const res = await TraditionalNft.mint(source.pubkey, source.secret, {
    filePath: '',
    name: '',
    symbol: 'LONG-SYMBOL-LONG',
    royalty: -100,
    storageType: 'nftStorage',
  });

  res.match(
    () => t.fail('Unrecognized error'),
    () => {
      (err: ValidatorError) => {
        t.not(err.message, '');
        console.log(err.details);
      };
    },
  );
});

test('[Error]Raise parameter error when not need uri or filePath', async (t) => {
  const owner = KeypairAccount.create();
  const asset = RandomAsset.get();
  const res = await TraditionalNft.mint(owner.pubkey, owner.secret, {
    name: asset.name!,
    symbol: asset.symbol!,
    royalty: 50,
    isMutable: true,
  });
  res.match(
    (_: unknown) => t.fail('Unrecognized error'),
    (err: Error) => {
      t.is(err.message, `Must set 'storageType + filePath' or 'uri'`);
    },
  );
});
