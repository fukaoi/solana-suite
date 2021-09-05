import {describe, it} from 'mocha';
import {assert} from 'chai'
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';
import {Transaction} from '../../../src/transaction';
import {MetaplexMetaData} from '../../../src/nft/metaplex/metadata';
import {MetaplexObject} from '../../../src/nft/metaplex/object';
import {MetaplexMint} from '../../../src/nft/metaplex/mint';

let source: Wallet.Keypair;
let dest: Wallet.Keypair;

describe('MetaplexMetaData', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it.skip('Create metadata', async () => {
    const args = {
      address: dest.pubkey,
      verified: true,
      share: 100
    };
    const metadata = new MetaplexObject.Data({
      name: 'kawamon2',
      symbol: 'KWM',
      uri: 'https://arweave.net/KYJ1UZ2X0WF9wake1YyiJXKxiek2B_lnuHtn5R1zD50',
      // uri: 'https://arweave.net/1eH7bZS-6HZH4YOc8T_tGp2Rq25dlhclXJkoa6U55mM',
      sellerFeeBasisPoints: 100,
      // creators: [new MetaplexObject.Creator(args)]
      creators: null
    });

    const txsign = await MetaplexMint.create(dest.pubkey, [dest.secret])();
    console.log("owner: ", dest.pubkey);
    const tx = await MetaplexMetaData.create(metadata, txsign.mintKey, dest.pubkey)(txsign.instructions);
    // todo: already signed. refactoring
    const res = await Transaction.sendInstructions(txsign.signers, tx);
    console.log(`# tx signature: ${res}`);
    // assert.isNotEmpty(res);
  });

  it('Get metadata', async () => {
    const metadata = new MetaplexObject.Data({
      name: 'kawamon',
      symbol: 'KWM',
      uri: 'https://example.com',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const res = await MetaplexMetaData.get('');
    console.log(res);
    assert.isNotEmpty(res);
  });
})
