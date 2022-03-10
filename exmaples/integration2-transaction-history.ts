//////////////////////////////////////////////
// $ npx ts-node exmaples/integration2-transaction-history
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
  // Get toransaction history
  //////////////////////////////////////////////

  const hist = await Transaction.getHistory(
    tokenKey.toPublicKey()
  );
  console.log('# history by token: ', hist.unwrap());

  const hist2 = await Transaction.getTokenHistory(
    tokenKey.toPublicKey(),
    publisher.toPublicKey()
  );
  console.log('# token history by publish: ', hist2.unwrap());

  const hist3 = await Transaction.getHistory(
    tokenKey.toPublicKey(),
    {
      actionFilter: [Transaction.Filter.Create]
    }
  );
  console.log('# history via action filter : ', hist3.unwrap());

  const hist4 = await Transaction.getHistory(
    tokenKey.toPublicKey(),
    {
      limit: 10
    }
  );
  console.log('# set limit history : ', hist4.unwrap());

  const hist5 = await Transaction.getHistory(
    publisher.toPublicKey(),
    {
      directionFilter: {
        filter: Transaction.DirectionType.Dest,
        pubkey: publisher.toPublicKey()
      }
    }
  );
  console.log('# history via transfer filter : ', hist5.unwrap());

  const hist6 = await Transaction.getTokenHistory(
    tokenKey.toPublicKey(),
    publisher.toPublicKey(),
    {
      directionFilter: {
        filter: Transaction.DirectionType.Dest,
        pubkey: publisher.toPublicKey()
      }
    }
  );
  console.log('# token history via transfer filter : ', hist6.unwrap());

})();
