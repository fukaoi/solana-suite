import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Metaplex, MetaplexInstructure} from '../../../src/nft/metaplex/index';
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';

let source: Wallet.Keypair;
let mintKey = '';

describe('Metaplex', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
  });

  it('Mint nft', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const res = await Metaplex.mint(data, source);
    mintKey = res.mintKey;
    console.log(`# mintKey: ${mintKey}`);
    console.log(`# tx signature: ${res.signature}`);
    assert.isNotEmpty(res);
  });
});
