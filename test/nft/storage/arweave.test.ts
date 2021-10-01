import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Wallet} from '../../../src/wallet';
import {StorageArweave} from '../../../src/nft/storage';
import setupKeyPair from '../../utils/setupKeyPair';
import {RandomAsset} from '../../utils/randomAsset';

let source: Wallet.KeyPair;

describe('StorageArweave', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Upload metadata json file and image', async () => {
    const asset = RandomAsset.storage();
    const res = await StorageArweave.upload(
      source.secret,
      asset
    );
    console.log('# arweave manifest url: ', res);
    assert.isNotEmpty(res);
  });
})
