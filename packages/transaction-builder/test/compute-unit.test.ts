import test from 'ava';
import { CompressedNft } from '~/suite-compressed-nft';
import { SolNative } from '~/suite-sol-native';
import { RegularNft } from '~/suite-regular-nft';
import { Account } from '~/account';
import { KeypairAccount } from '~/types/account';
import { Pubkey } from '~/types/account';
import { Setup } from 'test-tools/setup';
import { TransactionBuilder } from '../src';

let source: KeypairAccount;
let dest: KeypairAccount;
let feePayer: KeypairAccount;
let treeOwner: Pubkey;
let collectionMint: Pubkey;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  dest = obj.dest;
  feePayer = obj.feePayer;
  treeOwner = obj.treeOwner;
  collectionMint = obj.collectionMint;
});

test('Compute transfer instruction unit', async (t) => {
  const inst = SolNative.transfer(
    source.pubkey,
    dest.pubkey,
    [source.secret],
    0.00001,
  );

  const res = await TransactionBuilder.ComputeUnit.simulate(
    inst.unwrap().instructions,
    feePayer.secret.toKeypair(),
  );
  t.log(res);
  t.true(res !== undefined && res > 0);
});

test('Compute NFT mint instruction unit', async (t) => {
  const properties = {
    files: [
      {
        uri: 'https://devnet.irys.xyz/wilNVxxU8pdlmFQtuCyAb9C3PGJel_E2EeMP6WiyLdg',
        fileName: 'properties image',
        fileType: 'image/jpg',
      },
    ],
  };

  const collection = 'FMKm75Z9feXMrsKRT9Q6AqSrjHzFPYxpyrD4Hyfx4bup';
  const attributes = [
    { trait_type: 'hair', value: 'brown' },
    {
      trait_type: 'eye',
      value: 'blue',
    },
  ];

  const options = {
    github_url: 'https://github.com/fukaoi/solana-suite',
    docs_url: 'https://solana-suite.gitbook.io/solana-suite-develpoment-guide/',
  };

  const inst = await RegularNft.mint(source.secret, {
    uri: 'https://https://devnet.irys.xyz/xldM3MgbuNCKd5eEB0IV1fQe0qk14tTjGVylNaOj0nY',
    name: 'Fox',
    symbol: 'FOX',
    description: 'This is fox a image',
    external_url: 'https://fukaoi.github.io/solana-suite/',
    royalty: 50,
    isMutable: false,
    properties,
    collection,
    attributes,
    options,
  });

  const res = await TransactionBuilder.ComputeUnit.simulate(
    inst.unwrap().instructions,
    feePayer.secret.toKeypair(),
  );
  t.log(res);
  t.true(res !== undefined && res > 0);
});

test('Compute cNFT mint instruction unit', async (t) => {
  const receiver = Account.Keypair.create();

  const properties = {
    files: [
      {
        uri: 'https://devnet.irys.xyz/wilNVxxU8pdlmFQtuCyAb9C3PGJel_E2EeMP6WiyLdg',
        fileName: 'properties image',
        fileType: 'image/jpg',
      },
    ],
  };

  const collection = 'FMKm75Z9feXMrsKRT9Q6AqSrjHzFPYxpyrD4Hyfx4bup';
  const attributes = [
    { trait_type: 'hair', value: 'brown' },
    {
      trait_type: 'eye',
      value: 'blue',
    },
  ];

  const options = {
    github_url: 'https://github.com/fukaoi/solana-suite',
    docs_url: 'https://solana-suite.gitbook.io/solana-suite-develpoment-guide/',
  };

  const inst = await CompressedNft.mint(
    source.secret,
    {
      uri: 'https://https://devnet.irys.xyz/xldM3MgbuNCKd5eEB0IV1fQe0qk14tTjGVylNaOj0nY',
      name: 'Fox',
      symbol: 'FOX',
      description: 'This is fox a image',
      external_url: 'https://fukaoi.github.io/solana-suite/',
      royalty: 50,
      isMutable: false,
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

  const res = await TransactionBuilder.ComputeUnit.simulate(
    inst.unwrap().instructions,
    feePayer.secret.toKeypair(),
  );
  t.log(res);
  t.true(res !== undefined && res > 0);
});
