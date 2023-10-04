import test from 'ava';
import { RandomAsset } from 'test-tools/setupAsset';
import { NftStorage } from '../src/';

test('Upload content data', async (t) => {
  const asset = RandomAsset.get();
  const res = await NftStorage.uploadContent(asset.filePath!);

  res.match(
    (ok) => t.pass(`# nft.storage content url: ${ok}`),
    (err) => t.fail(err.message),
  );
});

test('Upload metadata json', async (t) => {
  const asset = RandomAsset.get();
  const image = {
    image: 'https://arweave.net/mVT6g3X99bZG0oMlTBB8fdbH7arnQ9lKWMUR9jMTXbQ',
  };
  const meta = { ...asset, ...image };
  const res = await NftStorage.uploadMetadata(meta);

  res.match(
    (ok) => t.pass(`# nft.storage content url: ${ok}`),
    (err) => t.fail(err.message),
  );
});
