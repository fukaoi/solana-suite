import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken, KeypairStr } from '../../src/';

let source: KeypairStr;
let mintStr: string;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Add minting token', async () => {
    // mint
    const inst = await SplToken.mint(
      source.toPublicKey(),
      [source.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);

    //add
    const inst2 = await SplToken.add(
      mintStr.toPublicKey(),
      source.toPublicKey(),
      [source.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const res2 = await inst2.submit();
    assert.isTrue(res2.isOk, res2.unwrap());
    mintStr = inst2.unwrap().data as string;
    console.log('# sig: ', res2);
  });
});