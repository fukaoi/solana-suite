import { describe, expect, it } from '@jest/globals';
import { Convert } from '../../src/convert/properties';
import { UserSideInput } from '../../src/types';
import { _Shared } from '../../src/types/';
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
      'nftStorage',
    );

    if (!output || !output.files) {
      expect(false).toBe(true);
    } else {
      output.files.forEach(async (file: _Shared.Properties) => {
        console.log('# uploade content', file);
        expect(file).not.toBeNull();
      });
    }
  });
});
