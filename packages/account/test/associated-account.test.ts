import { describe, it } from 'mocha';
import { assert } from 'chai';
import { AssociatedAccount } from '../src/associated-account';
import { SplToken } from '../src';
import { Setup } from '../../shared/test/testSetup';
import { RandomAsset } from '../../internals/storage/test/randomAsset';
import { KeypairAccount } from '@solana-suite/shared';

let source: KeypairAccount;
const TOKEN_METADATA = {
  name: 'solana-suite-token',
  symbol: 'SST',
  royalty: 50,
  filePath: RandomAsset.get().filePath as string,
  storageType: 'nftStorage' 
};

describe('AssociatedAccount', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Retry getOrCreate', async () => {
    const mintInst = await SplToken.mint(
      source.pubkey,
      source.secret,
      10000,
      1,
      TOKEN_METADATA
    );

    await mintInst.submit();

    assert.isTrue(mintInst.isOk, `${mintInst.unwrap()}`);
    const mint = mintInst.unwrap().data as string;

    const res = await AssociatedAccount.retryGetOrCreate(
      mint,
      source.pubkey,
      source.secret
    );

    console.log('# associated token account: ', res);
    assert.isString(res);
  });
});
