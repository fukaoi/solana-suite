import test from 'ava';
import { RandomAsset } from 'test-tools/setupAsset';
import { Storage } from '../src/';
import { KeypairAccount } from '~/types/account';
import { Setup } from 'test-tools/setup';

let source: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('[nftStorage] Upload file', async (t) => {
  const asset = RandomAsset.get();
  const res = await Storage.uploadFile(asset.filePath!, 'nftStorage');

  res.match(
    (ok) => {
      t.pass();
      t.log(`# nft.storage content url: ${ok}`);
    },
    (err) => t.fail(err.message),
  );
});

test('[nftStorage] Upload metadata json', async (t) => {
  const asset = RandomAsset.get();
  const image =
    'https://ipfs.io/ipfs/bafkreihot4ala2cozjqgnlwhia2ujtqjuyrekfzyktmg2vajnnkrlihfnm';
  const meta = {
    name: asset.name,
    symbol: asset.symbol,
    description: asset.description,
    image: image,
  };
  const res = await Storage.uploadData(meta, 'nftStorage');

  res.match(
    (ok) => {
      t.pass();
      t.log(`# nft.storage content url: ${ok}`);
    },
    (err: Error) => t.fail(err.message),
  );
});

test('[nftStorage] Upload metadata json and file', async (t) => {
  const asset = RandomAsset.get();
  const meta = {
    name: asset.name,
    symbol: asset.symbol,
    description: asset.description,
  };
  const res = await Storage.upload(meta, asset.filePath, 'nftStorage');

  res.match(
    (ok) => {
      t.pass();
      t.log(`# nft.storage content url: ${ok}`);
    },
    (err: Error) => t.fail(err.message),
  );
});

test('[arweave] Upload file', async (t) => {
  const asset = RandomAsset.get();
  const res = await Storage.uploadFile(asset.filePath!, 'arweave', {
    feePayer: source.secret,
  });

  res.match(
    (ok) => {
      t.pass();
      t.log(`# arweave content url: ${ok}`);
    },
    (err) => t.fail(err.message),
  );
});

test('[arweave] Upload metadata json', async (t) => {
  const asset = RandomAsset.get();
  const image =
    'https://ipfs.io/ipfs/bafkreihot4ala2cozjqgnlwhia2ujtqjuyrekfzyktmg2vajnnkrlihfnm';
  const meta = {
    name: asset.name,
    symbol: asset.symbol,
    description: asset.description,
    image: image,
  };
  const res = await Storage.uploadData(meta, 'arweave', {
    feePayer: source.secret,
  });

  res.match(
    (ok) => {
      t.pass();
      t.log(`# arweave content url: ${ok}`);
    },
    (err: Error) => t.fail(err.message),
  );
});

test('[arweave] Upload metadata json and file', async (t) => {
  const asset = RandomAsset.get();
  const meta = {
    name: asset.name,
    symbol: asset.symbol,
    description: asset.description,
  };

  const res = await Storage.upload(meta, asset.filePath, 'arweave', {
    feePayer: source.secret,
  });

  res.match(
    (ok) => {
      t.pass();
      t.log(`# arweave content url: ${ok}`);
    },
    (err: Error) => t.fail(err.message),
  );
});
