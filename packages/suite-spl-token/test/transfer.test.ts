import test from 'ava';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { SplToken } from '../src/';
import { KeypairAccount } from '~/types/account';
import { Account } from '~/account';

let source: KeypairAccount;
let dest: KeypairAccount;
let feePayer: KeypairAccount;

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
  dest = Account.Keypair.create();
  feePayer = obj.feePayer;
});

test('Create token, batch transfer', async (t) => {
  const inst1 = await SplToken.mint(
    source.secret,
    TOKEN_TOTAL_AMOUNT,
    MINT_DECIMAL,
    TOKEN_METADATA,
    {
      feePayer: feePayer.secret,
    },
  );

  t.true(inst1.isOk, `${inst1.unwrap()}`);
  const token = inst1.unwrap().data as string;
  (await inst1.submit()).match(
    (ok: string) => {
      t.log('# mint: ', token);
      t.log('# mint signature: ', ok);
    },
    (err: Error) => {
      t.fail(err.message);
    },
  );

  const inst2 = await SplToken.transfer(
    token,
    source.pubkey,
    dest.pubkey,
    [source.secret],
    1,
    MINT_DECIMAL,
    {
      feePayer: feePayer.secret,
    },
  );

  (await [inst2].submit()).match(
    (ok) => {
      t.log('# transfer signature: ', ok);
    },
    (err) => {
      t.fail(err.message);
    },
  );
});
