import {describe, it} from 'mocha';
import {assert} from 'chai'
import {KeypairStr, SplToken, Transaction} from '../../../src';
import {Metaplex, MetaplexInstructure} from '../../../src/nft/metaplex';
import {Setup} from '../../../test/utils/setup';

let source: KeypairStr;
let dest: KeypairStr;

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    dest = obj.dest;
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

  it('Transfer nft', async () => {
    const data = new MetaplexInstructure.Data({
      name: 'Sample',
      symbol: 'SAMPLE',
      uri: 'https://arweave.net/y43AREiMoMH4_pOQUtqVCd4eKG6W-sJf5STM13jq9w8',
      sellerFeeBasisPoints: 100,
      creators: null
    });

    const inst1 = await Metaplex.mint(
      data,
      source.toPubkey(),
      [source.toKeypair()],
    );

    assert.isTrue(inst1.isOk);

    const resMint = await inst1.unwrap().submit();
    console.log('# tokenKey: ', inst1.unwrap().data);
    console.log('# signature: ', resMint.unwrap());

    await Transaction.confirmedSig(resMint.unwrap());

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`)

    const inst2 = await SplToken.transfer(
      (inst1.unwrap().data as string).toPubkey(),
      source.toPubkey(),
      dest.toPubkey(),
      [source.toKeypair()],
      1,
      0,
    );

    const res = await inst2.unwrap().submit();
    console.log('# signature: ', res.unwrap());
  });
});
