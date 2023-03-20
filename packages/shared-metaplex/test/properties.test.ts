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

    const output = await Properties.toInputConvert(
      input,
      Storage.uploadContent,
      'nftStorage'
    );

    if (!output.files) {
      assert.fail('Miss match output.files');
    }
    output.files.forEach(async (file) => {
      console.log('# uploade content', file);
      assert.isNotNull(file);
    });
  });
});
