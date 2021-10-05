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
  SplNft,
  SplToken
} from '../src/index';

import {RandomAsset} from '../test/utils/randomAsset';

(async () => {

  //////////////////////////////////////////////
  // CREATE WALLET 
  //////////////////////////////////////////////

  // create nft owner wallet, receive nft receipt wallet.
  // const other = await Wallet.create();
  // const other2 = await Wallet.create();
  const publish = {
    pubkey: "AorMYhBGmqo8Czp65WLjA42vKaQ5jS69gxyk6KxAsK3x",
    secret: "64sCeeim12ihGEh6L9n1ksrWe9yRaVXG8DvcoQGeoquuirTSHmkjCnLQb5QHGC2U47HpFBCVwCCXogHwiY6cEFLN"
  };
  const receipt =
  {
    pubkey: '4pKTDgtvFGqazoGRZ2GE2gvXQUNmfM5PnZGY1nmAtbhp',
    // pubkey: 'C8dXhRSNcq7XQPwF6zKyTDhQFLuXxBtYFZ6zz7KH38Av',
    secret: '5qS4PgRmUf7SQtbiBXkPfLooyDdv7bUfDJVkgab7XqWuUTDU6fgEh727v4qVqaoQDqxYZKe87SL9TpEFoqHBMUtv'
    // secret: 'QXHv6ezJMFhfBmK6TEtigP9nm3bLudn4D6nZDwKnDM2pbxUGJZ2ouFUfmuM8UzwCVbzbhk1tDk4AAKcSuDLhn18'
  }
  console.log('# publish: ', publish);
  console.log('# receipt: ', receipt);
  // console.log('# other: ', other);
  // console.log('# other2: ', other2);


  //////////////////////////////////////////////
  // Upload contents 
  //////////////////////////////////////////////

  // Only test that call this function   
  // Usually set custom param
  // const asset = RandomAsset.storage();

  // console.log('# asset: ', asset);

  // metadata and image upload
  // const url = await StorageNftStorage.upload(asset);

  //////////////////////////////////////////////
  // CREATE NFT, MINT NFT FROM THIS LINE 
  //////////////////////////////////////////////

  // const data = new MetaplexInstructure.Data({
    // name: asset.name,
    // symbol: 'SAMPLE',
    // uri: url,
    // sellerFeeBasisPoints: 100,
    // creators: null
  // });

  // const res = await Metaplex.mint(data, publish.secret.toKeypair());

  // this is NFT ID
  // console.log('# tokenKey: ', res.tokenKey);
  // console.log('# mintSignature: ', res.signature);

  // untile completed in blockchain
  // await Node.getConnection().confirmTransaction(res.signature, 'max');

  //////////////////////////////////////////////
  // Display metadata from blockchain(optional)
  //////////////////////////////////////////////

  // const metadata = await MetaplexMetaData.getByTokenKey(
    // res.tokenKey.toPubKey()
  // );
  // console.log('# metadata: ', metadata);

  //////////////////////////////////////////////
  // TRANSFER RECEIPR USER FROM THIS LINE 
  //////////////////////////////////////////////

  // transfer nft to receipt wallet
  const transferSig = await SplNft.transfer(
    // res.tokenKey.toPubKey(),
    '8iLq9AjFtbPUzpehKEu3nRv48SHY7xeqogUVjMQkPtBu'.toPubKey(),
    // publish.secret.toKeypair(),
    receipt.secret.toKeypair(),
    // receipt.pubkey.toPubKey()
    publish.pubkey.toPubKey()
  );
  console.log('# Transfer nft sig: ', transferSig);

  // await Node.getConnection().confirmTransaction(transferSig, 'max');

  // const transferSig2 = await SplNft.transfer(
    // res.tokenKey.toPubKey(),
    // receipt.secret.toKeypair(),
    // other.pubkey.toPubKey(),
  // );

  // console.log('# Transfer2 nft sig: ', transferSig2);

  // await Node.getConnection().confirmTransaction(transferSig2, 'max');

  // const transferSig3 = await SplNft.transfer(
    // res.tokenKey.toPubKey(),
    // other.secret.toKeypair(),
    // other2.pubkey.toPubKey(),
  // );

  // console.log('# Transfer3 nft sig: ', transferSig3);


  // const history = await SplToken.getTransferHistory(res.tokenKey.toPubKey());
  // console.log('# Transfer History: ', history);


})().catch(console.error);
