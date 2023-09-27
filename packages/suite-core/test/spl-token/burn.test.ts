import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken } from '../../src/';
import { KeypairAccount } from '@solana-suite/shared';
import { RandomAsset } from '../../../internals/storage/test/randomAsset';

let source: KeypairAccount;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;
const TOKEN_METADATA = {
  name: 'solana-suite-token',
  symbol: 'SST',
  royalty: 50,
  filePath: RandomAsset.get().filePath as string,
  storageType: 'nftStorage',
  isMutable: false,
};

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Create token, burn token', async () => {
    const inst1 = await SplToken.mint(
      source.pubkey,
      source.secret,
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      TOKEN_METADATA
    );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
    const token = inst1.unwrap().data as string;
    console.log('# mint: ', token);

    const burnAmount = 500000;
    const inst2 = SplToken.burn(
      token,
      source.pubkey,
      [source.secret],
      burnAmount,
      MINT_DECIMAL
    );

    assert.isTrue(inst2.isOk);
    const sig = await [inst1, inst2].submit();
    console.log('signature: ', sig.unwrap());
  });
});