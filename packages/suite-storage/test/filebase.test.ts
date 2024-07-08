import test from 'ava';
import { RandomAsset } from 'test-tools/setupAsset';
import { Filebase } from '../src/filebase';

test('Upload file', async (t) => {
  const asset = RandomAsset.get();
  const res = await Filebase.uploadFile(asset.filePath!);

  res.match(
    (ok) => {
      t.pass();
      t.log(`# filebase ipfs url: ${ok}`);
    },
    (err) => {
      console.error(err);
      t.fail(err.message);
    },
  );
});

test('Upload metadata json', async (t) => {
  const asset = RandomAsset.get();
  const image = {
    image: 'https://arweave.net/mVT6g3X99bZG0oMlTBB8fdbH7arnQ9lKWMUR9jMTXbQ',
  };
  const meta = { ...asset, ...image };
  const res = await Filebase.uploadData(meta);

  res.match(
    (ok) => {
      t.pass();
      t.log(`# filebase ipfs url: ${ok}`);
    },
    (err: Error) => t.fail(err.message),
  );
});

test('Remove objects in buckets', async (t) => {
  const res = await Filebase.remove();
  res.match(
    async (ok) => {
      t.true(ok);
    },
    (err) => {
      console.error(err);
      t.fail(err.message);
    },
  );
});
