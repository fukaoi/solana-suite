import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Metaplex, MetaplexInstructure, Wallet} from '../../../src';
import {Setup} from '../../../test/utils/setup';

let source: Wallet.KeyPair;

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
    assert.isTrue(res.isOk());
    console.log(`# tokenKey: ${(<Metaplex.MintResult>res.value).tokenKey}`);
    console.log(`# tx signature: ${(<Metaplex.MintResult>res.value).signature}`);
  });
});
