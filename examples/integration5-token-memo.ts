//////////////////////////////////////////////
// $ npx ts-node examples/integration5-token-memo
//////////////////////////////////////////////

import assert from 'assert';
import {
  KeypairStr,
  SplToken,
  Pubkey,
  Memo,
  Airdrop,
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

  console.log('# owner: ', owner.pubkey);
  console.log('# receipt: ', receipt.pubkey);

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

  // this is NFT ID
  console.log('# mint: ', mint);

  //////////////////////////////////////////////
  // CREATE MEMO
  //////////////////////////////////////////////

  const memoData = `
  Omicron Is a Dress Rehearsal for the Next Pandemic
  America’s response to the variant highlights both
  how much progress we have made over the past two years — and
  how much work remains
  `;
  const inst2 = Memo.create(
    memoData,
    receipt.toPublicKey(), // memo's owner
    owner.toKeypair() // signer or feePayer
  );

  //////////////////////////////////////////////
  // TRANSFER RECEIPT USER FROM THIS LINE
  //////////////////////////////////////////////

  // transfer nft to receipt wallet
  const inst3 = await SplToken.transfer(
    mint.toPublicKey(),
    owner.toPublicKey(),
    receipt.toPublicKey(),
    [owner.toKeypair()],
    10,
    decimals
  );

  (await [inst1, inst2, inst3].submit()).match(
    async (value) => {
      console.log('# Transfer nft sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error)
  );

  //////////////////////////////////////////////
  // GET MEMO DATA
  //////////////////////////////////////////////

  const res = await SplToken.getHistory(
    mint.toPublicKey(),
    receipt.toPublicKey()
  );

  res.isOk && console.log('# Transfer Memo: ', res.value[0].memo);
})();
