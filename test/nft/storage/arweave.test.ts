import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Wallet} from '../../../src/wallet';
import {StorageArweave} from '../../../src/nft/storage/arweave';
import setupKeyPair from '../../utils/setupKeyPair';
import randomAsset from '../../utils/randomAsset';

let source: Wallet.Keypair;

describe('StorageArweave', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Upload metadata json file and image', async () => {
    const asset = randomAsset();
    const res = await StorageArweave.upload(
      source.secret,
      asset.name,
      asset.description,
      asset.imagePath,
    );
    console.log(res);
  });
})
