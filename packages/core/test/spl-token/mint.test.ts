import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken } from '../../src/';
import { RandomAsset } from '../../../storage/test/randomAsset';
import { InputTokenMetadata, StorageType } from '../../../shared-metaplex';
import { KeypairAccount } from '../../../shared/src/keypair-account';

let source: KeypairAccount;
let mintStr: string;
let tokenMetadata: InputTokenMetadata;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    tokenMetadata = {
      name: 'solana-suite-token',
      symbol: 'SST',
      filePath: RandomAsset.get().filePath as string,
      storageType: 'nftStorage' as StorageType,
      royalty: 50,
      // creators: [
      //   {
      //     address: source.pubkey,
      //     share: 100,
      //     authority: source.secret,
      //   },
      // ],
    };
  });

  it('Create token', async () => {
    const inst = await SplToken.mint(
      source.pubkey,
      source.secret,
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      tokenMetadata
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);
  });
});
