import { describe, expect, it } from '@jest/globals';
import { RandomAsset } from './randomAsset';
import { NftStorage } from '../src/nft-storage';

describe('StorageNftStorage', () => {
  it('Upload content data', async () => {
    const asset = RandomAsset.get();
    const res = await NftStorage.uploadContent(asset.filePath!);

    res.match(
      (ok: string) => console.log('# nft.storage content url: ', ok),
      (_) => expect(false).toBe(true),
    );
  });

  it('Upload metadata json', async () => {
    const asset = RandomAsset.get();
    const image = {
      image: 'https://arweave.net/mVT6g3X99bZG0oMlTBB8fdbH7arnQ9lKWMUR9jMTXbQ',
    };
    const meta = { ...asset, ...image };
    const res = await NftStorage.uploadMetadata(meta);

    res.match(
      (ok: string) => console.log('# nft.storage metadata url: ', ok),
      (_) => expect(false).toBe(true),
    );
  });
});
