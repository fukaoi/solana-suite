import {describe, it} from 'mocha';
import {assert} from 'chai'
import {RandomAsset} from '../randomAsset';
import {StorageNftStorage} from '../../src';

describe('StorageNftStorage', () => {
  it('Upload content data', async () => {
    const asset = RandomAsset.storage();
    const res = await StorageNftStorage.uploadContent(
      asset.image!,
    );

    res.match(
      ok => console.log('# nft.storage url: ', ok),
      err => assert.fail(err.message)
    );
  });

  it('Upload metadata json', async () => {
    const asset = RandomAsset.storage();
    const res = await StorageNftStorage.uploadMetadata(asset);

    res.match(
      ok => console.log('# nft.storage url: ', ok),
      err => assert.fail(err.message)
    );
  });
})
