import {describe, it} from 'mocha';
import {Wallet} from '../../src/wallet';
import {Util} from '../../src/util';
import {Transaction} from '../../src/transaction';
import {MetaplexMint} from '../../src/nft/metaplex/mint';
import {MetaplexObject} from '../../src/nft/metaplex/object';
import {MetaplexMetaData} from '../../src/nft/metaplex/metadata';
import {StorageNftStorage} from '../../src/nft/storage/nft-storage';

describe('##### Integration1 #####', () => {
  it('Create Metaplex NFT, transfer NFT', async () => {

    //////////////////////////////////////////////
    // CREATE WALLET 
    //////////////////////////////////////////////

    // create nft owner wallet, receive nft receipt wallet.
    const owner = await Wallet.create();
    const receipt = await Wallet.create();

    console.log('# owner: ', owner);
    console.log('# receipt: ', receipt);


    //////////////////////////////////////////////
    // CREATE NFT, MINT NFT FROM THIS LINE 
    //////////////////////////////////////////////

    // optional metadata and image upload
    const name = `Cat:${Util.dateFormat()}`;
    const url = await StorageNftStorage.upload(
      name,
      'Cute cat is like',
      'test/nft/storage/cat.jpeg'
    );

    // set for save metadata in blockchain[preprocessing]
    const metadata = new MetaplexObject.Data({
      name,
      symbol: 'CAT',
      uri: url,
      sellerFeeBasisPoints: 100,
      creators: null
    });

    // create nft by owner.
    // owner.pubkey: transaction payer
    // [owner.secret]: signer.enable multi signature for array param
    const txsign = await MetaplexMint.create(
      owner.pubkey,
      [owner.secret]
    )();

    // this is NFT ID
    console.log('# mintKey: ', txsign.mintKey);

    // create nft metadata
    const tx = await MetaplexMetaData.create(
      metadata,
      txsign.mintKey,
      owner.pubkey,
    )(txsign.instructions);

    // send transaction in solana blockchain
    // txsign.signers: all signers that need to send transaction
    // tx: txsign => tx be relied
    const mintSig = await Transaction.sendInstructions(
      txsign.signers,
      tx,
    );
    console.log('# Create nft sig: ', mintSig);


    //////////////////////////////////////////////
    // TRANSFER RECEIPR USER FROM THIS LINE 
    //////////////////////////////////////////////

    // transfer nft to receipt wallet
    // const transferSig = await SplNft.transferNft(
      // txsign.mintKey,
      // owner.secret,
      // receipt.pubkey
    // );

    // console.log('# Transfer nft sig: ', transferSig);
  });
})

