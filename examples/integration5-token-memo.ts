//////////////////////////////////////////////
// $ npx ts-node examples/integration5-token-memo
//////////////////////////////////////////////

import assert from 'assert';
import {
  Account,
  Transaction,
  SplToken,
  Pubkey,
  Memo
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

  console.log('# owner: ', owner.pubkey);
  console.log('# receipt: ', receipt.pubkey);


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
    owner.toKeypair(),     // signer or feePayer
  );


  //////////////////////////////////////////////
  // TRANSFER RECEIPR USER FROM THIS LINE
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
      await Transaction.confirmedSig(value);
    },
    (error) => assert(error)
  );

  //////////////////////////////////////////////
  // GET MEMO DATA
  //////////////////////////////////////////////

  const res = await Transaction.getTokenHistory(
    mint.toPublicKey(),
    receipt.toPublicKey(),
  );

  res.isOk && console.log('# Transfer Memo: ', res.value[0].memo);

})();
