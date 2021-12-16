import {describe, it} from 'mocha';
import {assert} from 'chai'
import {StorageNftStorage} from '../../../src/';
import {RandomAsset} from '../../utils/randomAsset';

describe('StorageNftStorage', () => {
  it('Upload metadata json file and image', async () => {
    const asset = RandomAsset.storage();
    const res = await StorageNftStorage.upload(asset);
    assert.isTrue(res.isOk);
    const url = res.unwrap();
    console.log('# upload url: ', url);
    assert.isString(url);
  });
})
