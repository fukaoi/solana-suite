import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken, KeypairStr } from '../../src/';
import { Node } from '../../../shared/src/node';
import { RandomAsset } from '@solana-suite/storage/test/randomAsset';
import { StorageType } from '@solana-suite/shared-metaplex';

let source: KeypairStr;

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

  it('Create token, burn token', async () => {
    const inst1 = await SplToken.mint(
      source.toPublicKey(),
      source.toKeypair(),
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      TOKEN_METADATA
    );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
    const token = inst1.unwrap().data as string;
    console.log('# mint: ', token);

    const burnAmount = 500000;
    const inst2 = await SplToken.burn(
      token.toPublicKey(),
      source.toPublicKey(),
      [source.toKeypair()],
      burnAmount,
      MINT_DECIMAL
    );

    assert.isTrue(inst2.isOk);
    const sig = await [inst1, inst2].submit();
    console.log('signature: ', sig.unwrap());

    // time wait
    await Node.confirmedSig(sig.unwrap());

    const res = await SplToken.findByOwner(source.toPublicKey());

    res.match(
      (ok) => {
        ok.forEach((data) => {
          if (data.mint === token) {
            assert.equal(data.amount, TOKEN_TOTAL_AMOUNT - burnAmount);
          }
        });
      },
      (err) => assert.fail(err.message)
    );
  });
});
