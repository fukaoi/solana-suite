import test from 'ava';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { SplToken } from '../src/';
import { KeypairAccount } from '~/types/account';
import { Pubkey } from '~/types/account';

let source: KeypairAccount;
let feePayer: KeypairAccount;
let mint: Pubkey;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;
const TOKEN_METADATA = {
  name: 'solana-suite-token',
  symbol: 'SST',
  royalty: 50,
  filePath: RandomAsset.get().filePath as string,
  isMutable: false,
};

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  feePayer = obj.feePayer;
});

test('Add minting token', async (t) => {
  const inst = await SplToken.mint(
    source.secret,
    TOKEN_TOTAL_AMOUNT,
    MINT_DECIMAL,
    TOKEN_METADATA,
    { feePayer: feePayer.secret },
  );

  t.true(inst.isOk, `${inst.unwrap()}`);

  const res = await inst.submit();
  t.true(res.isOk, res.unwrap());
  mint = inst.unwrap().data as Pubkey;
  t.log('# mint: ', mint);

  //add
  const inst2 = await SplToken.add(
    mint,
    source.pubkey,
    [source.secret],
    TOKEN_TOTAL_AMOUNT,
    MINT_DECIMAL,
  );

  t.true(inst.isOk, `${inst.unwrap()}`);

  const res2 = await inst2.submit();
  t.true(res2.isOk, res2.unwrap());
  mint = inst2.unwrap().data as Pubkey;
  t.log('# sig: ', res2);
});
