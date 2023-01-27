//////////////////////////////////////////////
// $ npx ts-node examples/integration2-transaction-history
//////////////////////////////////////////////

import assert from 'assert';
import {
  SplToken,
  Pubkey,
  KeypairStr,
  Airdrop,
  DirectionFilter,
} from '@solana-suite/core';

import { Node } from '@solana-suite/shared';
import { requestTransferByKeypair } from './requestTransferByKeypair';
import { RandomAsset } from '@solana-suite/storage/test/randomAsset';
import { StorageType } from '@solana-suite/shared-metaplex';

(async () => {
  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // create token owner wallet, receive token receipt wallet.
  const owner = KeypairStr.create();
  const receipt = KeypairStr.create();

  // faucet
  if (process.env.AIR_DROP) {
    await Airdrop.request(owner.toPublicKey());
  } else {
    await requestTransferByKeypair(owner.toPublicKey());
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
    storageType: 'nftStorage' as StorageType,
    isMutable: false,
  };
  const inst1 = await SplToken.mint(
    owner.toPublicKey(),
    owner.toKeypair(),
    totalAmount,
    decimals,
    tokenMetadata
  );

  const mint = inst1.unwrap().data as Pubkey;
  (await inst1.submit()).match(
    async (value) => {
      // this is NFT ID
      console.log('# mint: ', mint);
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error)
  );

  //////////////////////////////////////////////
  // TRANSFER RECEIPT USER FROM THIS LINE
  //////////////////////////////////////////////

  // transfer nft to receipt wallet
  const inst2 = await SplToken.transfer(
    mint.toPublicKey(),
    owner.toPublicKey(),
    receipt.toPublicKey(),
    [owner.toKeypair()],
    10,
    decimals
  );

  (await inst2.submit()).match(
    async (value) => {
      console.log('# Transfer nft sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error)
  );

  //////////////////////////////////////////////
  // GET TRANSACTION HISTORY
  //////////////////////////////////////////////

  const hist1 = await SplToken.getHistory(
    mint.toPublicKey(), // used mint
    owner.toPublicKey() // search key
  );
  console.log('# token history by publish: ', hist1.unwrap());

  const hist2 = await SplToken.getHistory(
    mint.toPublicKey(),
    receipt.toPublicKey(),
    {
      directionFilter: DirectionFilter.Dest, // Dest or Source
    }
  );
  console.log(
    '# token history result by destination filter : ',
    hist2.unwrap()
  );
})();
