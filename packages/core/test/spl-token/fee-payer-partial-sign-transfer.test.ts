import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken } from '../../src/';
import { RandomAsset } from '../../../storage/test/randomAsset';
import { StorageType } from '../../../shared-metaplex';
import { KeyPair, Pubkey } from '../../../shared';

let source: KeyPair;

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

  it('transfer feePayerPartialSign', async () => {
    const tokenOwner = KeyPair.create();
    const receipt = KeyPair.create();
    console.log('# owner: ', tokenOwner.pubkey);
    console.log('# receipt: ', receipt.pubkey);

    const inst1 = await SplToken.mint(
      tokenOwner.pubkey,
      tokenOwner.secret,
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      TOKEN_METADATA,
      source.secret
    );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
    await inst1.submit();
    const token = inst1.unwrap().data as Pubkey;
    console.log('# mint: ', token);

    const serialized = await SplToken.feePayerPartialSignTransfer(
      token,
      tokenOwner.pubkey,
      receipt.pubkey,
      [tokenOwner.secret],
      100,
      MINT_DECIMAL,
      source.pubkey
    );

    assert.isTrue(serialized.isOk, `${serialized.unwrap()}`);

    if (serialized.isOk) {
      const res = await serialized.value.submit(source.secret);
      assert.isTrue(res.isOk, `${res.unwrap()}`);
      console.log('# tx signature: ', res.unwrap());
    }
  });
});
