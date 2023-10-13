import fs from 'node:fs';
import test from 'ava';
import { JSDOM } from 'jsdom';
import { ProvenanceLayer } from '../src/';
import { RandomAsset } from 'test-tools/setupAsset';
import { Setup } from 'test-tools/setup';
import { KeypairAccount } from '~/account';

let source: KeypairAccount;

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

test.only('Error no match content', async (t) => {
  const dummy = new ArrayBuffer(0);
  const res = await ProvenanceLayer.toByteLength(dummy);
  console.log(res);
  // t.throws(async () => await ProvenanceLayer.toByteLength(dummy));
});

test('Get Irys object', async (t) => {
  const res = await ProvenanceLayer.getIrys(source.secret);
  t.true(typeof res === 'object');
});
