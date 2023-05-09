import { describe, it } from 'mocha';
import { Convert } from '../../src/convert/properties';
import { UserSideInput } from '../../src/types';
import { _Shared } from '../../src/types/';
import { assert } from 'chai';
import { RandomAsset } from '../../../storage/test/randomAsset';
import { Storage } from '../../../storage/src';

describe('Convert.Properties', () => {
  it('To input convert', async () => {
    const asset = RandomAsset.get();
    const input: UserSideInput.Properties = {
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

    const output = await Convert.Properties.intoInfraSide(
      input,
      Storage.uploadContent,
      'nftStorage'
    );

    if (!output || !output.files) {
      assert.fail('Miss match output.files');
    }
    output.files.forEach(async (file: _Shared.Properties) => {
      console.log('# uploade content', file);
      assert.isNotNull(file);
    });
  });
});
