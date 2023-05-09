//////////////////////////////////////////////
// $ npx ts-node examples/integration2-transaction-history
//////////////////////////////////////////////

import assert  from 'assert';
import { Airdrop, FilterType, SplToken } from '@solana-suite/core';

import { KeypairAccount, Node, Pubkey, sleep } from '@solana-suite/shared';
import { requestTransferByKeypair } from './requestTransferByKeypair';
import { RandomAsset } from '@solana-suite/storage/test/randomAsset';
import { StorageType } from '@solana-suite/shared-metaplex';

(async () => {
  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // create token owner wallet, receive token receipt wallet.
  const owner = KeypairAccount.create();
  const receipt = KeypairAccount.create();

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
    storageType: 'nftStorage' as StorageType,
    isMutable: false,
  };
  const inst1 = await SplToken.mint(
    owner.pubkey,
    owner.secret,
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
    mint,
    owner.pubkey,
    receipt.pubkey,
    [owner.secret],
    10,
    decimals
  );

  (await inst2.submit()).match(
    async (value) => {
      console.log('# Transfer nft sig: ', value.toExplorerUrl());
      await Node.confirmedSig(value);
      await sleep(10);
    },
    (error) => assert.fail(error)
  );

  //////////////////////////////////////////////
  // GET TRANSACTION HISTORY
  //////////////////////////////////////////////

  await SplToken.getHistory(
    mint, // used mint
    owner.pubkey, // search key
    FilterType.Transfer,
    (histories) => {
      histories.match(
        (ok) => {
          ok.forEach((history) => {
            console.log(history);
          });
        },
        (err) => assert.fail(err.message)
      );
    }
  );
})();
