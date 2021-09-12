import {describe, it} from 'mocha';
import {assert} from 'chai'
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';
import {Transaction} from '../../../src/transaction';
import {MetaplexNft} from '../../../src/nft/metaplex/nft';
import {MetaplexObject} from '../../../src/nft/metaplex/object';
import {MetaplexMetaData} from '../../../src/nft/metaplex/metadata';

let source: Wallet.Keypair;

describe('MetaplexNft', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Deploy metaplex nft', async () => {
    const data = new MetaplexObject.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });
    const txsign = await MetaplexNft.mint(source.pubkey, [source.secret])();

    console.log('# mintKey: ', txsign.mintKey);

    const metadataInst = await MetaplexMetaData.create(
      data, 
      txsign.mintKey, 
      source.pubkey,
    )(txsign.instructions);

    const updateTx = await MetaplexMetaData.update(
      data,
      undefined,
      undefined,
      txsign.mintKey,
      source.pubkey,
      source.pubkey,
      source.secret,
    )(metadataInst);

    const updateRes = await Transaction.sendInstructions(
      txsign.signers,
      updateTx
    );

    console.log(`# tx signature: ${updateRes}`);
    assert.isNotEmpty(updateRes);
  });
})
