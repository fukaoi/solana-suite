import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Wallet} from '../../../src';
import {Metaplex, MetaplexInstructure} from '../../../src/nft/metaplex';
import {Setup} from '../../../test/utils/setup';

let source: Wallet.KeypairStr;

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

    const res = await Metaplex.mint(
      data,
      source.pubkey.toPubKey(),
      [source.secret.toKeypair()],
    )({
      feePayer: source.pubkey.toPubKey()
    });

    assert.isTrue(res.isOk);
    console.log(`# tokenKey: ${(<Metaplex.MintResult>res.unwrap()).tokenKey}`);
    console.log(`# tx signature: ${(<Metaplex.MintResult>res.unwrap()).signature}`);
  });

  it('Mint nft with fee payer', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const res = await Metaplex.mint(
      data,
      source.pubkey.toPubKey(),
      [
        source.secret.toKeypair(),
      ]
    )({
      feePayer: source.pubkey.toPubKey(),
    });

    assert.isTrue(res.isOk, res.unwrap().toString());
    console.log(`# tokenKey: ${(<Metaplex.MintResult>res.unwrap()).tokenKey}`);
    console.log(`# tx signature: ${(<Metaplex.MintResult>res.unwrap()).signature}`);
  });
});
