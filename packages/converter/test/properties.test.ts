import test from 'ava';
import { Converter } from '../src/properties';
import { Common, UserSideInput } from '~/types/converter';
import { RandomAsset } from 'test-tools/setupAsset';
import { Storage } from '~/storage';

test('To input convert', async (t) => {
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

  const output = await Converter.Properties.intoInfraSide(
    input,
    /* @ts-ignore */
    Storage.uploadFile,
    'nftStorage',
  );

  if (!output || !output.files) {
    t.fail('Miss match output.files');
  } else {
    output.files.forEach(async (file: Common.Properties) => {
      t.log('# uploade content', file);
      t.not(file, null);
    });
  }
});
