//////////////////////////////////////////////
//$ npx ts-node exmaples/integration2-transfer-history
//////////////////////////////////////////////

import {
  Wallet,
  Transaction,
  SplNft,
  SplToken
} from '../src/index';

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET 
  //////////////////////////////////////////////

  // create nft owner wallet, receive nft receipt wallet.
  const publish = await Wallet.create();
  const receipt = await Wallet.create();
  console.log('# publish: ', publish);
  console.log('# receipt: ', receipt);


  //////////////////////////////////////////////
  // CREATE SPL NFT
  //////////////////////////////////////////////


  // Basically SPL and Metaplex NFT is same logic
  const tokenKey = await SplNft.create(publish.secret.toKeypair());

  // this is NFT ID
  console.log('# tokenKey: ', tokenKey);


  //////////////////////////////////////////////
  // TRANSFER RECEIPR USER FROM THIS LINE 
  //////////////////////////////////////////////

  // transfer nft to receipt wallet
  const transferSig = await SplNft.transfer(
    tokenKey.toPubKey(),
    publish.secret.toKeypair(),
    receipt.pubkey.toPubKey()
  );
  console.log('# Transfer nft sig: ', transferSig.toSigUrl());

  // untile completed in blockchain
  await Transaction.confirmedSig(transferSig);


  //////////////////////////////////////////////
  // Get token toransaction history
  //////////////////////////////////////////////

  // Get history object by tokenKey
  const history = await SplToken.getTransferHistory(tokenKey.toPubKey());
  console.log('# Transfer history by token: ', history);

  // Get history object by publish
  const historyPublish = await SplToken.getTransferHistory(publish.pubkey.toPubKey());
  console.log('# Transfer history by publish: ', historyPublish);

  // Get destination history list by tokenKey
  const destList = await SplToken.getTransferDestinationList(tokenKey.toPubKey());
  console.log('# Transfer destination list: ', destList);

})();
