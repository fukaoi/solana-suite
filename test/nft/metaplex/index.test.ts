import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Metaplex} from '../../../src/nft/metaplex/index';
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';
import {MetaplexObject} from '../../../src/nft/metaplex/object';

let source: Wallet.Keypair;
let dest: Wallet.Keypair;

const tokenKey = 'J6gikJi9rWxqLyEME1S1J2WfFk9x6gMAvz7QPHMhra6e';

describe('Metaplex', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  after(async () => {
    // refund nft
    await Metaplex.transfer(
      tokenKey,
      dest.secret,
      source.pubkey
    );
    console.log('# refund finished');
  });

  it('Deploy metaplex nft', async () => {
    const data = new MetaplexObject.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const tx = await Metaplex.mint(data, source);
    console.log(`# tx signature: ${tx}`);
    assert.isNotEmpty(tx);
  });

  it('transfer nft', async () => {
    const res = await Metaplex.transfer(
      tokenKey,
      source.secret,
      dest.pubkey
    );
    console.log('# transfer tx:', res);
    assert.isNotEmpty(res);
  });
})
