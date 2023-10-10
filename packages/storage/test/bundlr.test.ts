import { Bundlr } from '../src/';
import fs from 'node:fs';
import test from 'ava';
import { RandomAsset } from 'test-tools/setupAsset';

const browserUploaded = (filePath: string): ArrayBuffer => {
  const buffer = fs.readFileSync(filePath);
  return buffer.buffer;
};

test('string to buffer', (t) => {
  const asset = RandomAsset.get();
  const res = Bundlr.toBuffer(asset.filePath);
  t.true(res.isOk);
});

test('file to buffer', (t) => {
  const asset = RandomAsset.get();
  const res = Bundlr.toBuffer(browserUploaded(asset.filePath));
  t.true(res.isOk);
});
