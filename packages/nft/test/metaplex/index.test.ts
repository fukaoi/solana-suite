import {describe, it} from 'mocha';
import {
  MetaplexMetadata, 
  NftStorageMetaplexMetadata
} from '../../src/metaplex';

describe('Metaplex', () => {
  it('Define MetaplexMetadata', async () => {
    const data: MetaplexMetadata = {
      uri: 'https://xxxx.xxxx'
    };
  });

  it('Define NftStorageMetaplexMetadata', async () => {
    const data: NftStorageMetaplexMetadata = {
      uri: 'https://xxxx.xxxx',
      filePath: '',
    };
  });
});
