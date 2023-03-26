import { describe, it } from 'mocha';
import { Properties } from '../src/properties';
import { User } from '../src/types';
import { assert } from 'chai';
import { RandomAsset } from '../../storage/test/randomAsset';
import { Storage } from '../../storage/src';

describe('Properties', () => {
  it('To input convert', async () => {
    const asset = RandomAsset.get();
    const input: User.Properties = {
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

    const output = await Properties.toConvertInfra(
      input,
      Storage.uploadContent,
      'nftStorage'
    );

    if (!output || !output.files) {
      assert.fail('Miss match output.files');
    }
    output.files.forEach(async (file) => {
      console.log('# uploade content', file);
      assert.isNotNull(file);
    });
  });
});
