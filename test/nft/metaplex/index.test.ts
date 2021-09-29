import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Metaplex} from '../../../src/nft/metaplex/index';
import setupKeyPair from '../../../test/utils/setupKeyPair';
import {Wallet} from '../../../src/wallet';
import {MetaplexObject} from '../../../src/nft/metaplex/object';

let source: Wallet.Keypair;
let mintKey = '';

describe('Metaplex', () => {
  before(async () => {
    const obj = await setupKeyPair();
    source = obj.source;
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
    console.log(`# tx signature: ${res.signature}`);
    assert.isNotEmpty(res);
  });
})


// コンテンツ名：title、 => name
// コンテンツ説明：description、=> description
// サムネイル：thumnail_url、=> image
// データ：data_url、=> uri
// 移転上限回数：tx_limit、 => attributes.limits: transfer 
//                             attributes.value: 10 
//
// 利用上限回数：use_limit => attributes.limits: use_limit
//                             attributes.value: 10 
