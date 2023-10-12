import fs from 'node:fs';
import test from 'ava';
import { ProvenanceLayer } from '../src/';
import { RandomAsset } from 'test-tools/setupAsset';
import { Setup } from 'test-tools/setup';
import { KeypairAccount } from '~/account';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { JSDOM } from 'jsdom';

let source: KeypairAccount;

const browserUploaded = (filePath: string): ArrayBuffer => {
  const buffer = fs.readFileSync(filePath);
  return buffer.buffer;
};

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('string to buffer', (t) => {
  const asset = RandomAsset.get();
  t.notThrows(async () => {
    await ProvenanceLayer.toBuffer(asset.filePath);
  });
});

test('file to buffer', (t) => {
  const asset = RandomAsset.get();
  t.notThrows(async () => {
    await ProvenanceLayer.toBuffer(browserUploaded(asset.filePath));
  });
});

test('Get Irys object', async (t) => {
  const res = await ProvenanceLayer.getIrys(source.secret);
  t.true(typeof res === 'object');
});

// test('Get Irys object for browser', async (t) => {
//   const { window } = new JSDOM();
//   window.phantom = {
//     publicKey: source.toPublicKey(),
//     connect: () => console.log,
//   };
//   const mock = new PhantomWalletAdapter();
//   mock.connect();
//   const res = await ProvenanceLayer.getBrowserIrys(mock);
//   t.true(res);
// });
