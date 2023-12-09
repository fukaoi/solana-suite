//////////////////////////////////////////////
// $ npx ts-node examples/integration2-transaction-history
//////////////////////////////////////////////

import assert from 'assert';
import { Airdrop } from '@solana-suite/airdrop';
import {
  Account,
  Node,
  Pubkey,
  SplToken,
} from '@solana-suite/spl-token';

import { requestTransferByKeypair } from './requestTransferByKeypair';
import { RandomAsset } from 'test-tools/setupAsset';

(async () => {
  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // create token owner wallet, receive token receipt wallet.
  const owner = Account.Keypair.create();
  const receipt = Account.Keypair.create();

  // faucet
  if (process.env.AIR_DROP) {
    await Airdrop.request(owner.pubkey);
  } else {
    await requestTransferByKeypair(owner.pubkey);
  }

  console.log('# owner: ', owner);
  console.log('# receipt: ', receipt);

  //////////////////////////////////////////////
  // CREATE SPL TOKEN
  //////////////////////////////////////////////

  // Basically SPL and Metaplex NFT is same logic
  const totalAmount = 100000;
  const decimals = 1;
  const tokenMetadata = {
    name: 'solana-suite-token',
    symbol: 'SST',
    royalty: 50,
    filePath: RandomAsset.get().filePath as string,
    storageType: 'nftStorage',
    isMutable: false,
  };
  const inst1 = await SplToken.mint(
    owner.pubkey,
    owner.secret,
    totalAmount,
    decimals,
    tokenMetadata,
  );

  const mint = inst1.unwrap().data as Pubkey;
  (await inst1.submit()).match(
    async (value) => {
      // this is NFT ID
      console.log('# mint: ', mint);
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error),
  );

  //////////////////////////////////////////////
  // TRANSFER RECEIPT USER FROM THIS LINE
  //////////////////////////////////////////////

  // transfer nft to receipt wallet
  const inst2 = await SplToken.transfer(
    mint,
    owner.pubkey,
    receipt.pubkey,
    [owner.secret],
    10,
    decimals,
  );

  (await inst2.submit()).match(
    async (value) => {
      console.log('# Transfer nft sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error),
  );
})();
