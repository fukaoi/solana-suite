import test from 'ava';
import { KeypairAccount } from '~/account';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Arweave } from '../src';

let source: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('Upload file', async (t) => {
  const asset = RandomAsset.get();
  const res = await Arweave.uploadFile(asset.filePath!, source.secret);
  res.match(
    (ok: string) => {
      t.not(ok, '');
      console.log('# arweave content upload url: ', ok);
    },
    (err: Error) => t.fail(err.message),
  );
});

test('Upload meta data', async (t) => {
  const asset = RandomAsset.get();
  const res = await Arweave.uploadData(
    {
      name: asset.name,
      symbol: asset.symbol,
      description: asset.description,
      seller_fee_basis_points: 100,
      image: 'https://arweave.net/mVT6g3X99bZG0oMlTBB8fdbH7arnQ9lKWMUR9jMTXbQ',
    },
    source.secret,
  );
  res.match(
    (ok: string) => {
      t.not(ok, '');
      console.log('# arweave metadata url: ', ok);
    },
    (err: Error) => t.fail(err.message),
  );
});
