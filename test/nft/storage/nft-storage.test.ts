import {describe, it} from 'mocha';
import {assert} from 'chai'
import {StorageNftStorage} from '../../../src/nft/storage/nft-storage';
import {RandomAsset} from '../../utils/randomAsset';

describe('StorageNftStorage', () => {
  it('Upload metadata json file and image', async () => {
    const asset = RandomAsset.get();

    const res = await StorageNftStorage.upload(
      asset.name,
      asset.description,
      asset.imagePath
    );

    console.log('# upload url', res);
    assert.isString(res);
  });
})
