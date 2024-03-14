//////////////////////////////////////////////
// $ npx ts-node examples/integration13-upload-content.ts
//////////////////////////////////////////////

import { CompressedNft } from '@solana-suite/storage';
import { RandomAsset } from 'test-tools/setupAsset';
import assert from 'assert';

(async () => {
  ////////////////////////////////////////////////
  //// (NFF.STORAGE) UPLOAD CONTENT FILE(IMAGE, MOVIE) FOR NFT
  ////////////////////////////////////////////////

  const asset = RandomAsset.get();
  const res = await Storage.uploadFile(asset.filePath!, 'nftStorage');

  res.map(
    (ok) => {
      console.log(`# content url: ${ok}`);
    (err) => asset.fail(err.message),
  );

  ////////////////////////////////////////////////
  //// (NFF.STORAGE) UPLOAD METADATA(JSON) FOR NFT
  ////////////////////////////////////////////////

  const meta = {
    name: asset.name,
    symbol: asset.symbol,
    description: asset.description,
    image: image,
  };
  const res = await Storage.uploadData(meta, 'nftStorage');

  res.match(
    (ok) => {
      console.log(`# metadata url: ${ok}`);
    },
    (err: Error) => asset.fail(err.message),
  );
})();
