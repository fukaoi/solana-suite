import { describe, it } from 'mocha';
import { assert } from 'chai';
import { KeypairStr } from '../../../core';
import { Setup } from '../../../shared/test/testSetup';
import { RandomAsset } from '../randomAsset';
import { StorageArweave, ValidatorError } from '../../src';

let source: KeypairStr;

describe('StorageArweave', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Upload content data', async () => {
    const asset = RandomAsset.get();
    const res = await StorageArweave.uploadContent(
      asset.filePath!,
      source.toKeypair()
    );
    res.match(
      (ok) => console.log('# arweave content upload url: ', ok),
      (err) => assert.fail(err.message)
    );
  });

  it('Upload content data  with options', async () => {
    const asset = RandomAsset.get();
    const res = await StorageArweave.uploadContent(
      asset.filePath!,
      source.toKeypair(),
      {
        displayName: 'NFT test image',
        uniqueName: `randomAsset/${asset.image}`,
        contentType: 'image/jpeg',
        extension: 'jpg',
        tags: [{ name: 'demo', value: 'test' }],
      }
    );
    res.match(
      (ok) => console.log('# arweave content upload url: ', ok),
      (err) => assert.fail(err.message)
    );
  });

  it('Upload meta data', async () => {
    const asset = RandomAsset.get();
    const res = await StorageArweave.uploadMetadata(
      {
        name: asset.name,
        symbol: asset.symbol,
        description: asset.description,
        seller_fee_basis_points: asset.seller_fee_basis_points,
        image:
          'https://arweave.net/mVT6g3X99bZG0oMlTBB8fdbH7arnQ9lKWMUR9jMTXbQ',
        external_url: asset.external_url,
        attributes: asset.attributes,
        properties: asset.properties,
        collection: asset.collection,
      },
      source.toKeypair()
    );
    res.match(
      (ok) => console.log('# arweave metadata url: ', ok),
      (err) => assert.fail(err.message)
    );
  });

  it('Raise validation error when upload meta data', async () => {
    const asset = RandomAsset.get();
    const res = await StorageArweave.uploadMetadata(
      {
        name: '',
        symbol: 'LONG-SYMBOL-LONG',
        description: asset.description,
        seller_fee_basis_points: -100,
        image: `https://example.com/${'x'.repeat(200)}`,
        external_url: asset.external_url,
        attributes: asset.attributes,
        properties: asset.properties,
        collection: asset.collection,
      },
      source.toKeypair()
    );

    res.match(
      (_) => assert.fail('Unrecognized error'),
      (err) => {
        assert.isNotEmpty(err.message);
        console.log((err as ValidatorError).details);
      }
    );
  });

  it('Get file upload price', async () => {
    const asset = RandomAsset.get();
    const res = await StorageArweave.getUploadPrice(
      asset.filePath!,
      source.toKeypair()
    );
    res.match(
      (ok) => console.log('# upload cost, currency: ', ok.price, ok.currency),
      (err) => assert.fail(err.message)
    );
  });
});
