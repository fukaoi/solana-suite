import { describe, it } from 'mocha';
import { assert } from 'chai';
import { RandomAsset } from '../randomAsset';
import { StorageNftStorage, ValidatorError } from '../../src';

describe('StorageNftStorage', () => {
  it('Upload content data', async () => {
    const asset = RandomAsset.get();
    const res = await StorageNftStorage.uploadContent(asset.filePath!);

    res.match(
      (ok) => console.log('# nft.storage content url: ', ok),
      (err) => assert.fail(err.message)
    );
  });

  it('Upload metadata json', async () => {
    const asset = RandomAsset.get();
    const image = await StorageNftStorage.uploadContent(asset.filePath!);
    asset.image = image.unwrap();
    delete asset.filePath;
    const res = await StorageNftStorage.uploadMetadata(asset);

    res.match(
      (ok) => console.log('# nft.storage metadata url: ', ok),
      (err) => assert.fail(err.message)
    );
  });

  it('Raise validation error when upload meta data', async () => {
    const asset = RandomAsset.get();
    const res = await StorageNftStorage.uploadMetadata({
      name: '',
      symbol: 'LONG-SYMBOL-LONG',
      description: asset.description,
      seller_fee_basis_points: -100,
      image: `https://example.com/${'x'.repeat(200)}`,
      external_url: asset.external_url,
      attributes: asset.attributes,
      properties: asset.properties,
      collection: asset.collection,
    });

    res.match(
      (_) => assert.fail('Unrecognized error'),
      (err) => {
        assert.isNotEmpty(err.message);
        console.log((err as ValidatorError).details);
      }
    );
  });
});
