import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken } from '../../src/';
import { RandomAsset } from '../../../storage/test/randomAsset';
import { StorageType } from '../../../shared-metaplex';
import { KeypairAccount } from '../../../shared/src/keypair-account';
import { Pubkey } from '../../../shared';

let source: KeypairAccount;
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

  it('Create token', async () => {
    const inst = await SplToken.mint(
      source.pubkey,
      source.secret,
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      TOKEN_METADATA
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    assert.isTrue(KeypairAccount.isPubkey(inst.unwrap().data as Pubkey));

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);
  });
});
