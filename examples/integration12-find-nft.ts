//////////////////////////////////////////////
// $ npx ts-node examples/integration12-find-nft.ts
//////////////////////////////////////////////

import { CompressedNft } from '@solana-suite/compressed-nft';
import assert from 'assert';

(async () => {
  // //////////////////////////////////////////////
  // // FIND REGULAR NFT
  // //////////////////////////////////////////////

  // //////////////////////////////////////////////
  // // FIND COMPRESSED NFT
  // //////////////////////////////////////////////

  const cnft = '9hwSSid8DC2WEWtSiUL6s3tYntmJJZTAbeVBKhka7xN2';
  const owner = 'CGDRajhcFo9ysuUjBsbwCQHKJuCHiXeEUrMKSot1eyay';
  const collectionMint = 'FMKm75Z9feXMrsKRT9Q6AqSrjHzFPYxpyrD4Hyfx4bup';

  // Mint info
  const resMint = await CompressedNft.findByMint(cnft);
  resMint.match(
    (ok) => console.log('# mint info: ', ok),
    (err) => assert.fail(err),
  );

  // Mint info
  const resOwner = await CompressedNft.findByOwner(owner);
  resOwner.match(
    (ok) => console.log('# owner info: ', ok),
    (err) => assert.fail(err),
  );

  // Mint info
  const resCollection = await CompressedNft.findByCollection(collectionMint, {
    limit: 10,
  });
  resCollection.match(
    (ok) => console.log('# collection info: ', ok),
    (err) => assert.fail(err),
  );
})();
