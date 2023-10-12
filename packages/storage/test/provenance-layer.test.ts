import { ProvenanceLayer } from '../src/';
import fs from 'node:fs';
import test from 'ava';
import { RandomAsset } from 'test-tools/setupAsset';

const browserUploaded = (filePath: string): ArrayBuffer => {
  const buffer = fs.readFileSync(filePath);
  return buffer.buffer;
};

test('string to buffer', async (t) => {
  const asset = RandomAsset.get();
  const res = await ProvenanceLayer.toBuffer(asset.filePath);
  t.true(res.isOk);
});

test('file to buffer', async (t) => {
  const asset = RandomAsset.get();
  const res = await ProvenanceLayer.toBuffer(browserUploaded(asset.filePath));
  t.true(res.isOk);
});
