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

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Create token', async () => {
    const tokenMetadata = {
      name: 'solana-suite-token',
      symbol: 'SST',
      filePath: RandomAsset.get().filePath as string,
      storageType: 'nftStorage' as StorageType,
      royalty: 50,
    };

    const inst = await SplToken.mint(
      source.pubkey,
      source.secret,
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      tokenMetadata
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    assert.isTrue(KeypairAccount.isPubkey(inst.unwrap().data as Pubkey));

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);
  });

  it('Create token with creators', async () => {
    const creator = KeypairAccount.create();
    const tokenMetadata = {
      name: 'solana-suite-token',
      symbol: 'SST',
      filePath: RandomAsset.get().filePath as string,
      storageType: 'nftStorage' as StorageType,
      royalty: 50,
      creators: [
        {
          address: source.pubkey,
          share: 30,
          verified: false,
        },
        {
          address: creator.pubkey,
          share: 70,
          verified: false,
        },
      ],
    };
    const inst = await SplToken.mint(
      source.pubkey,
      source.secret,
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      tokenMetadata
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);
    assert.isTrue(KeypairAccount.isPubkey(inst.unwrap().data as Pubkey));

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);
  });
});
