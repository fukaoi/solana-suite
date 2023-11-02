import test from 'ava';
import { Setup } from 'test-tools/setup';
import { Account } from '~/account';
import { KeypairAccount, Pubkey } from '~/types/account';
import { RandomAsset } from 'test-tools/setupAsset';
import { SplToken } from '../src';

let source: KeypairAccount;
let mintStr: string;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('Create token', async (t) => {
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

  t.true(inst.isOk, `${inst.unwrap()}`);
  t.true(Account.Keypair.isPubkey(inst.unwrap().data as Pubkey));

  const res = await inst.submit();
  t.true(res.isOk, res.unwrap());
  mintStr = inst.unwrap().data as string;
  t.log('# mint: ', mintStr);
});

test('Create token with creators, freezeAuthority', async (t) => {
  const creator = Account.Keypair.create();
  const freezeAuthority = Account.Keypair.create();
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

  t.true(inst.isOk, `${inst.unwrap()}`);
  t.true(Account.Keypair.isPubkey(inst.unwrap().data as Pubkey));

  const res = await inst.submit();
  t.true(res.isOk, res.unwrap());
  mintStr = inst.unwrap().data as string;
  t.log('# mint: ', mintStr);
});

test('[Error]Raise parameter error when not need uri or filePath', async (t) => {
  const owner = Account.Keypair.create();
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
    () => t.fail('Unrecognized error'),
    (err: Error) => {
      t.is(err.message, `Must set 'storageType + filePath' or 'uri'`);
    },
  );
});
