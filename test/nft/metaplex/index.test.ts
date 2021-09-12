import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Metaplex} from '../../../src/nft/metaplex/index';
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';
import {MetaplexObject} from '../../../src/nft/metaplex/object';
import {Util} from '../../../src/util';

let source: Wallet.Keypair;
let dest: Wallet.Keypair;

let mintKey = '';

describe('Metaplex', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  after(async () => {
    // refund nft
    await Metaplex.transfer(
      mintKey,
      dest.secret,
      source.pubkey
    );
    console.log('# refund finished');
  });

  it('Mint nft', async () => {
    const data = new MetaplexObject.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const res = await Metaplex.mint(data, source);
    mintKey = res.mintKey;
    console.log(`# mintKey: ${mintKey}`);
    console.log(`# tx signature: ${res.tx}`);
    // untile completed in blockchain
    await Util.getConnection().confirmTransaction(res.tx, 'max');
    assert.isNotEmpty(res);
  });

  it('transfer nft', async () => {
    if (!mintKey) assert.fail('No mintKey. First of all must execute `Mint nft`')
    const res = await Metaplex.transfer(
      mintKey,
      source.secret,
      dest.pubkey
    );
    console.log('# transfer tx:', res);
    assert.isNotEmpty(res);
  });
})
