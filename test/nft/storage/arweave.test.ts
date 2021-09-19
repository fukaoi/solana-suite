import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Wallet} from '../../../src/wallet';
import {StorageArweave} from '../../../src/nft/storage/arweave';
import setupKeyPair from '../../../test/utils/setupKeyPair';

let source: Wallet.Keypair;

describe('StorageArweave', () => {

  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Upload metadata json file and image', async () => {

    const res = await StorageArweave.upload(
      source.secret,
      'Cat',
      'this cast is own',
      'test/nft/storage/cat.jpeg'
    );

    // console.log('# upload url', res);
    // assert.isString(res);
  });
})
