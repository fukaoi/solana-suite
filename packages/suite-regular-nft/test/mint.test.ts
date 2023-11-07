import test from 'ava';
import { RegularNft } from '../src';
import { Account } from '~/account';
import { KeypairAccount } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Pubkey } from '~/types/account';
import { Creators } from '~/types/regular-nft';
import { ValidatorError } from '~/validator';

let source: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('[nftStorage] mint nft, already uploaed image', async (t) => {
  const asset = RandomAsset.get();
  const res = await RegularNft.mint(source.pubkey, source.secret, {
    uri: 'https://ipfs.io/ipfs/bafkreibh6mv6zqvg2wopmtx3k4smavcfx55ob2pciuoob2z44acgtem754',
    storageType: 'nftStorage',
    name: asset.name!,
    symbol: asset.symbol!,
    royalty: 50,
  });

  t.true(Account.Keypair.isPubkey(res.unwrap().data as Pubkey));

  (await res.submit()).match(
    (ok: string) => {
      t.log('# mint:', res.unwrap().data);
      t.log('# sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});

test('[Arweave] mint nft', async (t) => {
  const asset = RandomAsset.get();
  const res = await RegularNft.mint(source.pubkey, source.secret, {
    filePath: asset.filePath as string,
    storageType: 'arweave',
    name: asset.name!,
    symbol: asset.symbol!,
    royalty: 50,
    isMutable: true,
  });

  t.true(Account.Keypair.isPubkey(res.unwrap().data as Pubkey));

  (await res.submit()).match(
    (ok: string) => {
      t.log('# mint:', res.unwrap().data);
      t.log('# sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});

test('[Nft Storage] mint nft with fee payer', async (t) => {
  const owner = Account.Keypair.create();
  const asset = RandomAsset.get();
  const res = await RegularNft.mint(
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

  t.true(Account.Keypair.isPubkey(res.unwrap().data as Pubkey));

  (await res.submit()).match(
    (ok: string) => {
      t.log('# mint:', res.unwrap().data);
      t.log('# sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});

test.only('[Nft Storage] mint nft with many optional datas', async (t) => {
  const asset = RandomAsset.get();
  const creators: Creators[] = [];
  const owner = Account.Keypair.create();
  const freezeAuthority = Account.Keypair.create();

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

  const collection = 'Htp4dfLmhFonYhYzuUEHqbP1CTiK6gjoHnR7U8t37fTv';

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

  const res = await RegularNft.mint(
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
      t.true(Account.Keypair.isPubkey(mint));
      t.log('# mint:', mint);
      t.log('# sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});

test('[Error]Raise validation error when upload meta data', async (t) => {
  const res = await RegularNft.mint(source.pubkey, source.secret, {
    filePath: '',
    name: '',
    symbol: 'LONG-SYMBOL-LONG',
    royalty: -100,
    storageType: 'nftStorage',
  });

  res.match(
    () => t.fail('Unrecognized error'),
    (err: Error) => {
      t.not(err.message, '');
      t.log((err as ValidatorError).details);
    },
  );
});

