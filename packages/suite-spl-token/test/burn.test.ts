import test from 'ava';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { SplToken } from '../src/';
import { KeypairAccount } from '~/types/account';

let source: KeypairAccount;
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
  feePayer = obj.feePayer;
});

test('Create token, burn token', async (t) => {
  const inst1 = await SplToken.mint(
    source.secret,
    TOKEN_TOTAL_AMOUNT,
    MINT_DECIMAL,
    TOKEN_METADATA,
    { feePayer: feePayer.secret },
  );

  t.true(inst1.isOk, `${inst1.unwrap()}`);
  const token = inst1.unwrap().data as string;
  t.log('# mint: ', token);

  const burnAmount = 500000;
  const inst2 = SplToken.burn(
    token,
    source.pubkey,
    [source.secret],
    burnAmount,
    MINT_DECIMAL,
    { feePayer: feePayer.secret },
  );

  t.true(inst2.isOk);
  const sig = await [inst1, inst2].submit();
  t.log('signature: ', sig.unwrap());
});
