import {describe, it} from 'mocha';
import {assert} from 'chai'
import {StorageNftStorage} from '../../../src/nft/storage/nft-storage';

describe('StorageNftStorage', () => {
  it('Upload metadata json file and image', async () => {

    const res = await StorageNftStorage.upload(
      'Cat',
      'this cast is own',
      'test/nft/storage/cat.jpeg'
    );

    console.log('# upload url', res);
    assert.isString(res);
  });
})
