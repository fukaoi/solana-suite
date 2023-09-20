import { beforeAll, describe, expect, it } from '@jest/globals';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken } from '../../src/spl-token';
import { RandomAsset } from '../../../internals/storage/test/randomAsset';
import { KeypairAccount } from '../../../shared/src/keypair-account';
import { Pubkey } from '../../../shared';

let source: KeypairAccount;
let mintStr: string;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;

describe('SplToken', () => {
  beforeAll(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Create token', async () => {
    const tokenMetadata = {
      name: 'solana-suite-token',
      symbol: 'SST',
      filePath: RandomAsset.get().filePath as string,
      storageType: 'nftStorage',
      royalty: 50,
    };

    const inst = await SplToken.mint(
      source.pubkey,
      source.secret,
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      tokenMetadata,
    );

    expect(KeypairAccount.isPubkey(inst.unwrap().data as Pubkey)).toBe(true);

    await inst.submit();
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);
  });

  it('Create token with creators, freezeAuthority', async () => {
    const creator = KeypairAccount.create();
    const freezeAuthority = KeypairAccount.create();
    const tokenMetadata = {
      name: 'solana-suite-token',
      symbol: 'SST',
      filePath: RandomAsset.get().filePath as string,
      storageType: 'nftStorage',
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
      tokenMetadata,
      undefined,
      freezeAuthority.pubkey,
    );

    expect(KeypairAccount.isPubkey(inst.unwrap().data as Pubkey)).toBe(true);

    await inst.submit();
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);
  });

  it('[Error]Raise parameter error when not need uri or filePath', async () => {
    const owner = KeypairAccount.create();
    const asset = RandomAsset.get();
    const res = await SplToken.mint(
      owner.pubkey,
      owner.secret,
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      {
        name: asset.name!,
        symbol: asset.symbol!,
      },
    );
    res.match(
      (_: unknown) => expect(false).toBe(true),
      (err: Error) => {
        expect(err.message).toEqual(
          "Must set 'storageType + filePath' or 'uri'",
        );
      },
    );
  });
});
