//////////////////////////////////////////////
// $ npx ts-node examples/integration13-upload-content.ts
//////////////////////////////////////////////

import { Storage } from '@solana-suite/storage';
import { Account, sleep } from '@solana-suite/utils';
import { RandomAsset } from 'test-tools/setupAsset';
import { requestSol } from 'test-tools';
import assert from 'assert';

(async () => {
  ////////////////////////////////////////////////
  //// (NFT.STORAGE) UPLOAD CONTENT FILE(IMAGE, MOVIE) FOR NFT
  ////////////////////////////////////////////////

  const feePayer = Account.Keypair.create();
  const asset = RandomAsset.get();
  const resFile = await Storage.uploadFile(asset.filePath!, 'nftStorage');
  console.log('# owner: ', feePayer.pubkey);

  await requestSol(feePayer.pubkey, 0.01);
  await sleep(2);

  const contentUrl = resFile.map(
    (ok) => {
      console.log(`# (nft.storage)content url: ${ok}`);
      return ok;
    },
    (err) => assert.fail(err.message),
  );

  ////////////////////////////////////////////////
  //// (NFT.STORAGE) UPLOAD METADATA(JSON) FOR NFT
  ////////////////////////////////////////////////

  const meta = {
    name: asset.name,
    symbol: asset.symbol,
    description: asset.description,
    image: contentUrl.unwrap(),
  };
  const resMetadata = await Storage.uploadData(meta, 'nftStorage');

  resMetadata.match(
    (ok) => {
      console.log(`# (nft.storage)cmetadata url: ${ok}`);
    },
    (err: Error) => assert.fail(err.message),
  );

  ////////////////////////////////////////////////
  //// (ARWEAVE) UPLOAD CONTENT FILE(IMAGE, MOVIE) FOR NFT
  ////////////////////////////////////////////////

  const resFile2 = await Storage.uploadFile(asset.filePath!, 'arweave', {
    feePayer: feePayer.secret,
  });

  const contentUrl2 = resFile2.map(
    (ok) => {
      console.log(`# (arweave)content url: ${ok}`);
      return ok;
    },
    (err) => assert.fail(err.message),
  );

  ////////////////////////////////////////////////
  //// (NFF.STORAGE) UPLOAD METADATA(JSON) FOR NFT
  ////////////////////////////////////////////////

  const meta2 = {
    name: asset.name,
    symbol: asset.symbol,
    description: asset.description,
    image: contentUrl2.unwrap(),
  };
  const resMetadata2 = await Storage.uploadData(meta2, 'arweave', {
    feePayer: feePayer.secret,
  });

  resMetadata2.match(
    (ok) => {
      console.log(`# (arweave)metadata url: ${ok}`);
    },
    (err: Error) => assert.fail(err.message),
  );
})();
