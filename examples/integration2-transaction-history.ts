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

import {
  Node
} from '@solana-suite/shared';


(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET
  //////////////////////////////////////////////

  // create token owner wallet, receive token receipt wallet.
  const owner = KeypairStr.create();
  const receipt = KeypairStr.create();

  // faucet 1 sol
  await Airdrop.request(owner.toPublicKey());

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

  (await [inst1, inst2].submit()).match(
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
    mint.toPublicKey(),  // used mint
    owner.toPublicKey()  // search key
  );
  console.log('# token history by publish: ', hist1.unwrap());

  const hist2 = await SplToken.getHistory(
    mint.toPublicKey(),
    receipt.toPublicKey(),
    {
      directionFilter: DirectionFilter.Dest, // Dest or Source
    }
  );
  console.log('# token history result by destination filter : ', hist2.unwrap());

})();
