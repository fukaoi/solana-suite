//////////////////////////////////////////////
// $ npx ts-node examples/integration5-token-memo
//////////////////////////////////////////////

import assert from 'assert';
import { Airdrop } from '@solana-suite/airdrop';
import {
  Account,
  FilterType,
  Node,
  Pubkey,
  SplToken,
} from '@solana-suite/spl-token';
import { Memo } from '@solana-suite/memo';

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
  const inst2 = Memo.create(memoData, owner.pubkey, owner.secret);

  (await [inst1, inst2].submit()).match(
    async (value) => {
      console.log('# memo sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error),
  );

  //////////////////////////////////////////////
  // TRANSFER RECEIPT USER FROM THIS LINE
  //////////////////////////////////////////////

  // transfer nft to receipt wallet
  const inst3 = await SplToken.transfer(
    mint,
    owner.pubkey,
    receipt.pubkey,
    [owner.secret],
    10,
    decimals,
  );

  (await inst3.submit()).match(
    async (value) => {
      console.log('# Transfer sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
    },
    (error) => assert.fail(error),
  );
})();
