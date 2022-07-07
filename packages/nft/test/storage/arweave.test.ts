import {describe, it} from 'mocha';
import {assert} from 'chai';
import {KeypairStr} from '../../../core';
import {Setup} from '../../../shared/test/testSetup';
import {RandomAsset} from '../randomAsset';
import {StorageArweave} from '../../src';

let source: KeypairStr;

describe('StorageArweave', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
  });

  it('Upload content data', async () => {
    const asset = RandomAsset.storage();
    const res = await StorageArweave.uploadContent(
      source.toKeypair(),
      asset.image!,
    );
    res.match(
      ok => console.log('# arweave url: ', ok),
      err => assert.fail(err.message)
    );
  });

  it('Upload content data  with options', async () => {
    const asset = RandomAsset.storage();
    const res = await StorageArweave.uploadContent(
      source.toKeypair(),
      asset.image!,
      {
        displayName: 'NFT test image',
        uniqueName: `randomAsset/${asset.image}`,
        contentType: 'image/jpeg',
        extension: 'jpg',
        tags: [{name: 'demo', value: 'test'}]
      }
    );
    res.match(
      ok => console.log('# arweave url: ', ok),
      err => assert.fail(err.message)
    );
  });

  it('Upload meta data', async () => {
    const asset = RandomAsset.storage();
    const res = await StorageArweave.uploadMetadata(
      source.toKeypair(),
      {
        name: asset.name,
        symbol: asset.symbol,
        description: asset.description,
        seller_fee_basis_points: asset.seller_fee_basis_points,
        image: asset.image,
        external_url: asset.external_url,
        attributes: asset.attributes,
        properties: asset.properties,
        collection: asset.collection,
      }
    );
    res.match(
      ok => console.log('# arweave url: ', ok),
      err => assert.fail(err.message)
    );
  });
})
