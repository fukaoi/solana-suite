import {describe, it} from 'mocha';
import {assert} from 'chai'
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';
import {MetaplexNft} from '../../../src/nft/metaplex/nft';

let source: Wallet.Keypair;

describe('MetaplexNft', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Create metaplex nft', async () => {
    const txsign = await MetaplexNft.mint(source.pubkey, [source.secret])();
    console.log('# mintKey: ', txsign.mintKey);
    assert.isNotEmpty(txsign);
  });
})
