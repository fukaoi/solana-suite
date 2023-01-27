import { describe, it } from 'mocha';
import { assert } from 'chai';
import { AssociatedAccount } from '../src/associated-account';
import { KeypairStr, SplToken } from '../src';
import { Setup } from '@solana-suite/shared/test/testSetup';
import { RandomAsset } from '@solana-suite/storage/test/randomAsset';
import { StorageType } from '@solana-suite/shared-metaplex';

let source: KeypairStr;
const TOKEN_METADATA = {
  name: 'solana-suite-token',
  symbol: 'SST',
  royalty: 50,
  filePath: RandomAsset.get().filePath as string,
  storageType: 'nftStorage' as StorageType,
};

describe('AssociatedAccount', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Retry getOrCreate', async () => {
    const mintInst = await SplToken.mint(
      source.toPublicKey(),
      source.toKeypair(),
      10000,
      1,
      TOKEN_METADATA
    );

    await mintInst.submit();

    assert.isTrue(mintInst.isOk, `${mintInst.unwrap()}`);
    const mint = mintInst.unwrap().data as string;

    const res = await AssociatedAccount.retryGetOrCreate(
      mint.toPublicKey(),
      source.toPublicKey(),
      source.toKeypair()
    );

    console.log('# associated token account: ', res);
    assert.isString(res);
  });
});
