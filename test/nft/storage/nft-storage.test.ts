import {describe, it} from 'mocha';
import {assert} from 'chai'
import {MetadataStorageFormat} from '../../../src/nft/storage';
import {StorageNftStorage} from '../../../src/nft/storage/nft-storage';
import randomAsset from '../../utils/randomAsset';

describe('StorageNftStorage', () => {
  it('Upload metadata json file and image', async () => {
    const asset = randomAsset();

    const storageData: MetadataStorageFormat = {
      name: asset.name,
      description: asset.description,
      image: asset.imagePath,
    };
    const res = await StorageNftStorage.upload(storageData);

    console.log('# upload url: ', res);
    assert.isString(res);
  });
})
