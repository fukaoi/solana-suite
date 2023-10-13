import fs from 'node:fs';
import test from 'ava';
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

test('Get Irys object', async (t) => {
  const res = await ProvenanceLayer.getIrys(source.secret);
  t.true(typeof res === 'object');
});

test('Upload file', async (t) => {
  const asset = RandomAsset.get();
  await ProvenanceLayer.fundArweave(asset.filePath, source.secret);
  const res = await ProvenanceLayer.uploadFile(asset.filePath, source.secret);
  t.true(res.isOk, res.unwrap());
});

test('Upload file with tags', async (t) => {
  const asset = RandomAsset.get();
  await ProvenanceLayer.fundArweave(asset.filePath, source.secret);
  const res = await ProvenanceLayer.uploadFile(asset.filePath, source.secret, [
    {
      name: 'app_id',
      value: 'solana-suuite',
    },
  ]);
  t.true(res.isOk, res.unwrap());
});
