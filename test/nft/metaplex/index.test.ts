import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Account, KeypairStr} from '../../../src';
import {Metaplex, MetaplexInstructure} from '../../../src/nft/metaplex';
import {Setup} from '../../../test/utils/setup';

let source: KeypairStr;

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

    const inst = await Metaplex.mint(
      data,
      source.toPubkey(),
      [source.toKeypair()],
    );

    assert.isTrue(inst.isOk);
    const res = await inst.unwrap().submit();
    console.log('# tokenKey: ', inst.unwrap().data);
    console.log('# signature: ', res.unwrap());
  });

  it.only('Mint nft with fee payer', async () => {
    const owner = Account.create();
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const inst = await Metaplex.mint(
      data,
      owner.toPubkey(),
      [
        owner.toKeypair(),
      ],
      source.toKeypair(), // feePayer
    );

    assert.isTrue(inst.isOk);
    const res = await inst.unwrap().submit();
    console.log('# tokenKey: ', inst.unwrap().data);
    console.log('# signature: ', res.unwrap());
  });
});
