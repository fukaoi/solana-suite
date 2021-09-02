import {describe, it} from 'mocha';
import {assert} from 'chai'
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';
import {Transaction} from '../../../src/transaction';
import {MetaplexMetaData} from '../../../src/nft/metaplex/metadata';
import {MetaplexObject} from '../../../src/nft/metaplex/object';
import {MetaplexMint} from '../../../src/nft/metaplex/mint';

let source: Wallet.Keypair;

describe('MetaplexMetaData', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Create metadata', async () => {
    const metadata = new MetaplexObject.Data({
      name: 'kawamon',
      symbol: 'KWM',
      uri: 'https://example.com',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const txsign = await MetaplexMint.create(source.pubkey, [source.secret])();
    const tx = await MetaplexMetaData.create(metadata, txsign.mintKey, source.pubkey)(txsign.instructions);
    const res = await Transaction.sendInstructions(txsign.signers, tx);
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });

  it.only('Get metadata', async () => {
    const metadata = new MetaplexObject.Data({
      name: 'kawamon',
      symbol: 'KWM',
      uri: 'https://example.com',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const res = await MetaplexMetaData.get('');
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });
})
