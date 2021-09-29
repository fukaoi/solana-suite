import {describe, it} from 'mocha';
import {assert} from 'chai';
import {Wallet} from '../../../src/wallet';
import {StorageArweave} from '../../../src/nft/storage/arweave';
import setupKeyPair from '../../utils/setupKeyPair';
import randomAsset from '../../utils/randomAsset';
import {Storage} from '../../../src/nft/storage';

let source: Wallet.Keypair;

describe('StorageArweave', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Upload metadata json file and image', async () => {
    const asset = randomAsset();
    const storageData = Storage.initStorageData();
    storageData.name = asset.name;
    storageData.description = asset.description;
    storageData.image = asset.imagePath;
    const res = await StorageArweave.upload(
      source.secret,
      storageData
    );
    console.log('# arweave manifest url: ', res);
    assert.isNotEmpty(res);
  });
})
