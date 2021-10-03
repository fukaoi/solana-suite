import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Metaplex, MetaplexInstructure} from '../../../src/nft/metaplex/index';
import {Setup} from '../../../test/utils/setup';
import {Wallet} from '../../../src/wallet';

let source: Wallet.KeyPair;
let tokenKey = '';

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
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

    const res = await Metaplex.mint(data, source.secret.toKeypair());
    tokenKey = res.tokenKey;
    console.log(`# tokenKey: ${tokenKey}`);
    console.log(`# tx signature: ${res.signature}`);
    assert.isNotEmpty(res);
  });
});
