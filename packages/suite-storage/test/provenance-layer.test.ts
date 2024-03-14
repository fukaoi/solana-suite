import fs from 'node:fs';
import test from 'ava';
import { ProvenanceLayer } from '../src/provenance-layer';
import { RandomAsset } from 'test-tools/setupAsset';
import { Setup } from 'test-tools/setup';
import { KeypairAccount } from '~/types/account';

let source: KeypairAccount;
const uploadData = {
  id: '0001',
  type: 'donut',
  name: 'Cake',
  image: {
    url: 'images/0001.jpg',
    width: 200,
    height: 200,
  },
  thumbnail: {
    url: 'images/thumbnails/0001.jpg',
    width: 32,
    height: 32,
  },
};

const calByteLength = (filePath: string): number => {
  const buffer = fs.readFileSync(filePath);
  return buffer.length;
};

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('string to byte length', async (t) => {
  const asset = RandomAsset.get();
  const res = await ProvenanceLayer.toByteLength(asset.filePath);
  const expeted = calByteLength(asset.filePath);
  t.is(res, expeted);
});

test('Get Irys object', async (t) => {
  const res = await ProvenanceLayer.getIrys(source.secret);
  t.true(typeof res === 'object');
});

test('Upload file', (t) => {
  const asset = RandomAsset.get();
  t.notThrows(async () => {
    ProvenanceLayer.fundArweave(asset.filePath, source.secret);
    ProvenanceLayer.uploadFile(asset.filePath, source.secret);
  });
});

test('Upload file with tags', (t) => {
  const asset = RandomAsset.get();
  t.notThrows(async () => {
    await ProvenanceLayer.fundArweave(asset.filePath, source.secret);
    await ProvenanceLayer.uploadFile(asset.filePath, source.secret, [
      {
        name: 'app_id',
        value: 'solana-suuite',
      },
    ]);
  });
});

test('Upload data', (t) => {
  const asset = RandomAsset.get();
  t.notThrows(async () => {
    await ProvenanceLayer.fundArweave(asset.filePath, source.secret);
    await ProvenanceLayer.uploadData(JSON.stringify(uploadData), source.secret);
  });
});

test('Upload data with tags', (t) => {
  const asset = RandomAsset.get();
  t.notThrows(async () => {
    await ProvenanceLayer.fundArweave(asset.filePath, source.secret);
    await ProvenanceLayer.uploadData(
      JSON.stringify(uploadData),
      source.secret,
      [
        {
          name: 'app_id',
          value: 'solana-suuite',
        },
      ],
    );
  });
});
