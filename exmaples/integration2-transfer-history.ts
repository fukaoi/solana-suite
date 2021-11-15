//////////////////////////////////////////////
//$ npx ts-node exmaples/integration2-transfer-history
//////////////////////////////////////////////

//Notice: not worked. now modifing

import {
  Account,
  Transaction,
  SplNft,
  SplToken
} from '../src/index';

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET 
  //////////////////////////////////////////////

  // create nft owner wallet, receive nft receipt wallet.
  const publish = Account.create();
  const receipt = Account.create();

  // faucet 1 sol
  await Account.requestAirdrop(publish.pubkey.toPubKey());

  console.log('# publish: ', publish);
  console.log('# receipt: ', receipt);


  //////////////////////////////////////////////
  // CREATE SPL NFT
  //////////////////////////////////////////////


  // Basically SPL and Metaplex NFT is same logic
  const tokenKey = await SplNft.create(
    publish.pubkey.toPubKey(),
    publish.secret.toKeypair()
  );

  if (tokenKey.isErr) {
    console.error(tokenKey.error);
    process.exit(1);
  }

  const token = tokenKey.unwrap();

  // this is NFT ID
  console.log('# tokenKey: ', token);


  //////////////////////////////////////////////
  // TRANSFER RECEIPR USER FROM THIS LINE 
  //////////////////////////////////////////////

  // transfer nft to receipt wallet
  const transferSig = await SplNft.transfer(
    token.toPubKey(),
    publish.pubkey.toPubKey(),
    receipt.pubkey.toPubKey()
  )({
    signers: [publish.secret.toKeypair()]
  });



  await transferSig.match(
    async (value) => {
      console.log('# Transfer nft sig: ', value.toSigUrl());
      // untile completed in blockchain
      await Transaction.confirmedSig(value);
    },
    (error) => {
      console.error(error);
      process.exit(1);
    }
  );

  //////////////////////////////////////////////
  // Get token toransaction history
  //////////////////////////////////////////////

  // Get history object by tokenKey
  const history = await SplToken.getTransferHistory(token.toPubKey());
  console.log('# Transfer history by token: ', history.unwrap());

  // Get history object by publish
  const historyPublish = await SplToken.getTransferHistory(publish.pubkey.toPubKey());
  console.log('# Transfer history by publish: ', historyPublish.unwrap());

  // Get destination history list by tokenKey
  const destList = await SplToken.getTransferDestinationList(token.toPubKey());
  console.log('# Transfer destination list: ', destList.unwrap());

})();
