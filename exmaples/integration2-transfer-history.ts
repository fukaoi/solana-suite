//////////////////////////////////////////////
// $ npx ts-node exmaples/integration2-transfer-history
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
  const publisher = Account.create();
  const receipt = Account.create();

  // faucet 1 sol
  await Account.requestAirdrop(publisher.toPublicKey());

  console.log('# publisher: ', publisher);
  console.log('# receipt: ', receipt);


  //////////////////////////////////////////////
  // CREATE SPL TOKEN
  //////////////////////////////////////////////


  // Basically SPL and Metaplex NFT is same logic
  const totalAmount = 100000;
  const decimals = 1;
  const inst1 = await SplToken.mint(
    publisher.toPublicKey(),
    [publisher.toKeypair()],
    totalAmount,
    decimals
  );


  const tokenKey = inst1.unwrap().data as Pubkey;

  // this is NFT ID
  console.log('# tokenKey: ', tokenKey);


  //////////////////////////////////////////////
  // TRANSFER RECEIPR USER FROM THIS LINE
  //////////////////////////////////////////////

  // transfer nft to receipt wallet
  const inst2 = await SplToken.transfer(
    tokenKey.toPublicKey(),
    publisher.toPublicKey(),
    receipt.toPublicKey(),
    [publisher.toKeypair()],
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
  // Get token toransaction history
  //////////////////////////////////////////////

  // Get history object by tokenKey
  const history = await Transaction.getTransactionHistory(tokenKey.toPublicKey());
  console.log('# Transfer history by token: ', history.unwrap());

  // Get history object by publish
  const historyPublish = await Transaction.getTransactionHistory(publisher.toPublicKey());
  console.log('# Transfer history by publish: ', historyPublish.unwrap());

  // Get destination history list by tokenKey
  const destList = await Transaction.getTransferTokenDestinationList(tokenKey.toPublicKey());
  console.log('# Transfer destination list: ', destList.unwrap());

})();
