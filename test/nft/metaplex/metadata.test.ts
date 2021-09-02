import {describe, it} from 'mocha';
import {assert} from 'chai'
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';
import {Transaction} from '../../../src/transaction';
import {MetaplexMetaData} from '../../../src/nft/metaplex/metadata';
import {MetaplexObject} from '../../../src/nft/metaplex/object';
import {Util} from '../../../src/util';

let source: Wallet.Keypair;

describe('MetaplexMetaData', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
    console.log(source);
  });

  it('Create metadata', async () => {
    const metadata = new MetaplexObject.Data({
      name: '',
      symbol: '',
      uri: '',
      sellerFeeBasisPoints: 100,
      creators: null
    });
    const tx = await MetaplexMetaData.create(metadata, source.pubkey, source.secret)();
    const res = await Transaction.sendInstructions([Util.createKeypair(source.secret)], tx);
    console.log(`# tx signature: ${res}`);
    assert.isNotEmpty(res);
  });
})
