//////////////////////////////////////////////
//$ npx ts-node exmaples/integration1-metaplex-nft.ts
//////////////////////////////////////////////

import {
  Wallet,
  Node,
  Metaplex,
  MetaplexInstructure,
  MetaplexMetaData,
  StorageNftStorage,
  SplNft
} from '../src/index';

import {RandomAsset} from '../test/utils/randomAsset';

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET 
  //////////////////////////////////////////////

  // create nft owner wallet, receive nft receipt wallet.
  const publish = await Wallet.create();
  // const receipt = await Wallet.create();
  const receipt = {pubkey: 'FCdMcH77AsQsMKTq6LaLdjQQarmB4RbxDvuoi1M1i9vX'};
  console.log('# publish: ', publish);
  console.log('# receipt: ', receipt);


  //////////////////////////////////////////////
  // Upload contents 
  //////////////////////////////////////////////

  // Only test that call this function   
  // Usually set custom param
  const asset = RandomAsset.storage();

  console.log('# asset: ', asset);

  // metadata and image upload
  const url = await StorageNftStorage.upload(asset);

  //////////////////////////////////////////////
  // CREATE NFT, MINT NFT FROM THIS LINE 
  //////////////////////////////////////////////

  const data = new MetaplexInstructure.Data({
    name: asset.name,
    symbol: 'SAMPLE',
    uri: url,
    sellerFeeBasisPoints: 100,
    creators: null
  });

  const res = await Metaplex.mint(data, publish.secret.toKeypair());

  // this is NFT ID
  console.log('# tokenKey: ', res.tokenKey);
  console.log('# mintSignature: ', res.signature);

  // untile completed in blockchain
  await Node.getConnection().confirmTransaction(res.signature, 'max');

  //////////////////////////////////////////////
  // Display metadata from blockchain(optional)
  //////////////////////////////////////////////

  const metadata = await MetaplexMetaData.getByTokenKey(
    res.tokenKey.toPubKey()
  );
  console.log('# metadata: ', metadata);

  //////////////////////////////////////////////
  // TRANSFER RECEIPR USER FROM THIS LINE 
  //////////////////////////////////////////////

  // transfer nft to receipt wallet
  const transferSig = await SplNft.transfer(
    res.tokenKey.toPubKey(),
    publish.secret.toKeypair(),
    receipt.pubkey.toPubKey()
  );
  console.log('# Transfer nft sig: ', transferSig);

})();
