import {describe, it} from 'mocha';
import {Wallet} from '../../src/wallet';
import {Util} from '../../src/util';
import {Metaplex, MetaplexObject, MetaplexMetaData} from '../../src/nft/metaplex';
import {StorageNftStorage} from '../../src/nft/storage/nft-storage';
import {SplNft} from '../../src/nft/spl';
import {RandomAsset} from '../utils/randomAsset';

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
    // Upload contents 
    //////////////////////////////////////////////

    // Only test that call this function   
    // Usually set custom param
    const asset = RandomAsset.get();

    console.log('# asset: ', asset);

    // metadata and image upload
    const url = await StorageNftStorage.upload(
      asset.name,
      asset.description,
      asset.imagePath
    );

    //////////////////////////////////////////////
    // CREATE NFT, MINT NFT FROM THIS LINE 
    //////////////////////////////////////////////

    const data = new MetaplexObject.Data({
      name: asset.name,
      symbol: 'SAMPLE',
      uri: url,
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const res = await Metaplex.mint(data, owner);

    // this is NFT ID
    console.log('# mintKey: ', res.mintKey);
    console.log('# mintSignature: ', res.signature);

    // untile completed in blockchain
    await Util.getConnection().confirmTransaction(res.signature, 'max');

    //////////////////////////////////////////////
    // Display metadata from blockchain(optional)
    //////////////////////////////////////////////

    const metadata = await MetaplexMetaData.getByMintKey(res.mintKey);
    console.log('# metadata: ', metadata);

    //////////////////////////////////////////////
    // TRANSFER RECEIPR USER FROM THIS LINE 
    //////////////////////////////////////////////

    // transfer nft to receipt wallet
    const transferSig = await SplNft.transfer(
      res.mintKey,
      owner.secret,
      receipt.pubkey
    );
    console.log('# Transfer nft sig: ', transferSig);
  });
})

