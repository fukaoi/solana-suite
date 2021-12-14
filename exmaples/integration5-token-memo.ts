//////////////////////////////////////////////
//$ npx ts-node exmaples/integration5-token-memo
//////////////////////////////////////////////

import assert from 'assert';
import {
  Account,
  Transaction,
  SplToken,
  Pubkey
} from '../src/index';

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET 
  //////////////////////////////////////////////

  // create token owner wallet, receive token receipt wallet.
  const owner = Account.create();
  const receipt = Account.create();
  const receipt2 = Account.create();

  // faucet 1 sol
  await Account.requestAirdrop(owner.toPubkey());

  console.log('# publisher: ', owner);
  console.log('# receipt: ', receipt);
  console.log('# receipt2: ', receipt2);


  //////////////////////////////////////////////
  // CREATE SPL TOKEN
  //////////////////////////////////////////////


  // Basically SPL and Metaplex NFT is same logic
  const totalAmount = 100000;
  const decimals = 1;
  const inst1 = await SplToken.mint(
    owner.toPubkey(),
    [owner.toKeypair()],
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
    tokenKey.toPubkey(),
    owner.toPubkey(),
    receipt.toPubkey(),
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
  // Get memo data in transaction
  //////////////////////////////////////////////

})();
