import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Storage} from '../../../src/nft/storage';
import {StorageNftStorage} from '../../../src/nft/storage/nft-storage';
import randomAsset from '../../utils/randomAsset';

describe('StorageNftStorage', () => {
  it('Upload metadata json file and image', async () => {
    const asset = randomAsset();
    const storageData = Storage.initStorageData();
    storageData.name = asset.name;
    storageData.description = asset.description;
    storageData.image = asset.imagePath;

    const res = await StorageNftStorage.upload(storageData);

    console.log('# upload url: ', res);
    assert.isString(res);
  });
})
