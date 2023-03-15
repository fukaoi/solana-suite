import { describe, it } from 'mocha';
import { Properties } from '../src/properties';
import { assert } from 'chai';
import { RandomAsset } from '../../storage/test/randomAsset';
import { MetadataProperties } from '../dist/cjs';

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

    const files = Properties.toInputConvert(input, 'nftStorage');
    files?.forEach(async (file) => {
      console.log(await file);
    });
    // assert.deepEqual(expected, res);
  });
});
