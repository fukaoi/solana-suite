//////////////////////////////////////////////
// $ npx ts-node examples/integration1-regular-nft.ts
//////////////////////////////////////////////

import assert from 'assert';
import { Airdrop } from '@solana-suite/airdrop';
import { Account, Node, Pubkey, RegularNft } from '@solana-suite/regular-nft';
import { RandomAsset } from 'test-tools/setupAsset';
import { requestTransferByKeypair } from './requestTransferByKeypair';

(async () => {
  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // create nft owner wallet.
  const owner = Account.Keypair.create();
  const receipt = Account.Keypair.create();
  const feePayer = Account.Keypair.create();

  // faucet
  if (process.env.AIR_DROP) {
    await Airdrop.request(feePayer.pubkey);
  } else {
    await requestTransferByKeypair(feePayer.pubkey);
  }

  console.log('# owner: ', owner.pubkey);
  console.log('# receipt: ', receipt.pubkey);
  console.log('# feePayer: ', feePayer.pubkey);

  // Only test that call this function
  // Usually set custom param
  const asset = RandomAsset.get();
  console.log('# demo data: ', asset);

  //////////////////////////////////////////////
  // CREATE NFT, MINT NFT FROM THIS LINE
  //////////////////////////////////////////////

  const inst1 = await RegularNft.mint(
    owner.pubkey,
    owner.secret,
    {
      filePath: asset.filePath!,
      name: asset.name!,
      symbol: 'SAMPLE',
      royalty: 7,
      storageType: 'nftStorage',
      isMutable: true,
      external_url: 'https://github.com/atonoy/solana-suite',
    },
    { feePayer: feePayer.secret },
  );

  // this is NFT ID
  (await inst1.submit()).match(
    async (value) => await Node.confirmedSig(value, 'finalized'),
    (error) => assert.fail(error),
  );

  const mint = inst1.unwrap().data as Pubkey;
  console.log('# mint: ', mint);

  //////////////////////////////////////////////
  // Display metadata from blockchain(optional)
  //////////////////////////////////////////////

  await RegularNft.findByOwner(
    owner.pubkey,
    (value) => console.log('# metadata: ', value),
    (error) => assert.fail(error),
  );

  //////////////////////////////////////////////
  // TRANSFER RECEIPTS USER FROM THIS LINE
  //////////////////////////////////////////////

  //transfer nft owner => receipt
  const inst2 = await RegularNft.transfer(
    mint,
    owner.pubkey,
    receipt.pubkey,
    [owner.secret],
    { feePayer: feePayer.secret },
  );

  // submit instructions
  (await inst2.submit()).match(
    (value) => console.log('# sig: ', value),
    (error) => assert.fail(error),
  );
})();
