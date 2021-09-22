import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Wallet} from '../../../src/wallet';
import {StorageArweave} from '../../../src/nft/storage/arweave';
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {RandomAsset} from '../../utils/randomAsset';

let source: Wallet.Keypair;

describe('StorageArweave', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Upload metadata json file and image', async () => {
    const asset = RandomAsset.get();
    const res = await StorageArweave.upload(
      source.secret,
      asset.name,
      asset.description,
      asset.imagePath
    );
    console.log(res);
    // console.log('# upload url', res);
    // assert.isString(res);
  });
})
