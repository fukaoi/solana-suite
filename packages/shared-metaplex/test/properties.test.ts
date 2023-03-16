import { describe, it } from 'mocha';
import { Properties } from '../src/properties';
import { assert } from 'chai';
import { RandomAsset } from '../../storage/test/randomAsset';
import { MetadataProperties } from '../dist/cjs';
import { Storage } from '../../storage/src';

describe('Properties', () => {
  it('To input convert', async () => {
    const asset = RandomAsset.get();
    const input: MetadataProperties = {
      files: [
        {
          type: 'image/jpeg',
          filePath: asset.filePath!,
        },
        {
          type: 'image/gif',
          filePath: asset.filePath!,
        },
      ],
    };

    const files = await Properties.toInputConvert(
      input,
      Storage.uploadContent,
      'nftStorage'
    );
    files.forEach(async (file) => {
      console.log('# uploade content', file);
      assert.isNotNull(file);
    });
  });
});
