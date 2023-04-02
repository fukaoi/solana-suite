import { describe, it } from 'mocha';
import { assert } from 'chai';
import { KeypairAccount } from '../../shared';
import { Setup } from '../../shared/test/testSetup';
import { RandomAsset } from './randomAsset';
import { Arweave } from '../src/arweave';

let source: KeypairAccount;

describe('StorageArweave', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Upload content data', async () => {
    const asset = RandomAsset.get();
    const res = await Arweave.uploadContent(asset.filePath!, source.secret);
    res.match(
      (ok: string) => console.log('# arweave content upload url: ', ok),
      (err: Error) => assert.fail(err.message)
    );
  });

  it('Upload content data  with options', async () => {
    const asset = RandomAsset.get();
    const res = await Arweave.uploadContent(asset.filePath!, source.secret, {
      displayName: 'NFT test image',
      uniqueName: `randomAsset`,
      contentType: 'image/jpeg',
      extension: 'jpg',
      tags: [{ name: 'demo', value: 'test' }],
    });
    res.match(
      (ok: string) => console.log('# arweave content upload url: ', ok),
      (err: Error) => assert.fail(err.message)
    );
  });

  it('Upload meta data', async () => {
    const asset = RandomAsset.get();
    const res = await Arweave.uploadMetadata(
      {
        name: asset.name,
        symbol: asset.symbol,
        description: asset.description,
        seller_fee_basis_points: 100,
        image:
          'https://arweave.net/mVT6g3X99bZG0oMlTBB8fdbH7arnQ9lKWMUR9jMTXbQ',
      },
      source.secret
    );
    res.match(
      (ok: string) => console.log('# arweave metadata url: ', ok),
      (err: Error) => assert.fail(err.message)
    );
  });

  it('Get file upload price', async () => {
    const asset = RandomAsset.get();
    const res = await Arweave.getUploadPrice(asset.filePath!, source.secret);
    res.match(
      (ok: { price: number; currency: any }) =>
        console.log('# upload cost, currency: ', ok.price, ok.currency),
      (err: Error) => assert.fail(err.message)
    );
  });
});
