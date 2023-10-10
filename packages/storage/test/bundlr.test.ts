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
  const buffer = Bundlr.toBuffer(asset.filePath);
  console.log(buffer);
  t.pass();
});

test('file to buffer', (t) => {
  const asset = RandomAsset.get();
  const buffer = Bundlr.toBuffer(browserUploaded(asset.filePath));
  console.log(buffer);
  t.pass();
});
