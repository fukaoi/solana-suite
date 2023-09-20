import { describe, it, beforeAll, expect } from '@jest/globals';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken } from '../../src/';
import { RandomAsset } from '../../../internals/storage/test/randomAsset';
import { KeypairAccount, Pubkey } from '../../../shared';

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
  beforeAll(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('transfer feePayerPartialSign', async () => {
    const tokenOwner = KeypairAccount.create();
    const receipt = KeypairAccount.create();
    console.log('# owner: ', tokenOwner.pubkey);
    console.log('# receipt: ', receipt.pubkey);

    const inst1 = await SplToken.mint(
      tokenOwner.pubkey,
      tokenOwner.secret,
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      TOKEN_METADATA,
      source.secret,
    );

    expect(inst1.isOk).toBe(true);
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
      source.pubkey,
    );

    expect(serialized.isOk).toBe(true);

    if (serialized.isOk) {
      const res = await serialized.value.submit(source.secret);
      expect(res.isOk).toBe(true);
      console.log('# tx signature: ', res.unwrap());
    }
  });
});
