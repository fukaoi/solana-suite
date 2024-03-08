import test from 'ava';
import { Converter } from '../src/properties';
import { RandomAsset } from 'test-tools/setupAsset';
import { Storage } from '~/storage';
import { Properties } from '~/types/storage';

test('To input convert', async (t) => {
  const asset = RandomAsset.get();
  const input: Properties = {
    files: [
      {
        type: 'image/jpeg',
        filePath: asset.filePath!,
      },
      {
        type: 'image/gif',
        uri: 'https://bafkreieqnysit3wcknz24k23r33qhk7bnqlismg5vbvg3uvz2p5ozpx4xu.ipfs.dweb.link/',
      },
    ],
  };

  const output = await Converter.Properties.intoInfra(
    input,
    /* @ts-ignore */
    Storage.uploadFile,
    'nftStorage',
  );

  if (!output || !output.files) {
    t.fail('Miss match output.files');
  } else {
    output.files.forEach(async (file: Properties) => {
      t.log('# uploade content', file);
      t.not(file, null);
    });
  }
});
