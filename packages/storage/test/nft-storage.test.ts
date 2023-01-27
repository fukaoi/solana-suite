import { describe, it } from 'mocha';
import { assert } from 'chai';
import { RandomAsset } from './randomAsset';
import { NftStorage } from '../src/nft-storage';

describe('StorageNftStorage', () => {
  it('Upload content data', async () => {
    const asset = RandomAsset.get();
    const res = await NftStorage.uploadContent(asset.filePath!);

    res.match(
      (ok) => console.log('# nft.storage content url: ', ok),
      (err) => assert.fail(err.message)
    );
  });

  it('Upload metadata json', async () => {
    const asset = RandomAsset.get();
    const image = await NftStorage.uploadContent(asset.filePath!);
    asset.image = image.unwrap();
    delete asset.filePath;
    const res = await NftStorage.uploadMetadata(asset);

    res.match(
      (ok) => console.log('# nft.storage metadata url: ', ok),
      (err) => assert.fail(err.message)
    );
  });
});
