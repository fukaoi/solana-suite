import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken } from '../../src/';
import { RandomAsset } from '../../../storage/test/randomAsset';
import { StorageType } from '../../../shared-metaplex/src';
import { KeyPair } from '../../../shared/src/';

let source: KeyPair;
let mintStr: string;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;
const TOKEN_METADATA = {
  name: 'solana-suite-token',
  symbol: 'SST',
  royalty: 50,
  filePath: RandomAsset.get().filePath as string,
  storageType: 'nftStorage' as StorageType,
  isMutable: false,
};

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Add minting token', async () => {
    // mint
    const inst = await SplToken.mint(
      source.pubkey,
      source.pubkey,
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      TOKEN_METADATA
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);

    //add
    const inst2 = await SplToken.add(
      mintStr,
      source.pubkey,
      [source.secret],
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
