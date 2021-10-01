import {describe, it} from 'mocha';
import {assert} from 'chai'
import {StorageNftStorage} from '../../../src/nft/storage';
import {RandomAsset} from '../../utils/randomAsset';

describe('StorageNftStorage', () => {
  it('Upload metadata json file and image', async () => {
    const asset = RandomAsset.storage();
    const res = await StorageNftStorage.upload(asset);
    console.log('# upload url: ', res);
    assert.isString(res);
  });
})
