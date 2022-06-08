//////////////////////////////////////////////
// $ npx ts-node examples/integration2-transaction-history
//////////////////////////////////////////////

import assert from 'assert';
import {
  Account,
  Transaction,
  SplToken,
  Pubkey
} from '@solana-suite/core';

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // create token owner wallet, receive token receipt wallet.
  const owner = Account.create();
  const receipt = Account.create();

  // faucet 1 sol
  await Account.requestAirdrop(owner.toPublicKey());

  console.log('# owner: ', owner);
  console.log('# receipt: ', receipt);


  //////////////////////////////////////////////
  // CREATE SPL TOKEN
  //////////////////////////////////////////////


  // Basically SPL and Metaplex NFT is same logic
  const totalAmount = 100000;
  const decimals = 1;
  const inst1 = await SplToken.mint(
    owner.toPublicKey(),
    [owner.toKeypair()],
    totalAmount,
    decimals
  );


  const mint = inst1.unwrap().data as Pubkey;

  // this is NFT ID
  console.log('# mint: ', mint);

  //////////////////////////////////////////////
  // TRANSFER RECEIPR USER FROM THIS LINE
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

  (await [inst1, inst2].submit()).match(
    async (value) => {
      console.log('# Transfer nft sig: ', value.toExplorerUrl());
      await Transaction.confirmedSig(value);
    },
    (error) => assert(error)
  );

  //////////////////////////////////////////////
  // GET TRANSACTION HISTORY
  //////////////////////////////////////////////

  const hist1 = await Transaction.getTokenHistory(
    mint.toPublicKey(),  // used mint
    owner.toPublicKey()  // search key
  );
  console.log('# token history by publish: ', hist1.unwrap());

  // Not token history(Difference between getHistory and getTokenHistory)
  const hist2 = await Transaction.getHistory(
    owner.toPublicKey(),  // search key
    {
      actionFilter: [Transaction.Filter.Create] // Only 'create' history
    }
  );
  console.log('# history by create action filter: ', hist2.unwrap());

  // History of receiptkey as the main destitnation.
  const hist3 = await Transaction.getTokenHistory(
    mint.toPublicKey(),
    receipt.toPublicKey(),
    {
      directionFilter: Transaction.DirectionFilter.Dest, // Dest or Source
    }
  );
  console.log('# token history result by destination filter : ', hist3.unwrap());

})();
