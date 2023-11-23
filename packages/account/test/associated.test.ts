import test from 'ava';
import { SplToken } from '@solana-suite/spl-token';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Account } from '../src';
import { KeypairAccount } from '~/types/account';

let source: KeypairAccount;
const TOKEN_METADATA = {
  name: 'solana-suite-token',
  symbol: 'SST',
  royalty: 50,
  filePath: RandomAsset.get().filePath as string,
};

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('Retry getOrCreate', async (t) => {
  const mintInst = await SplToken.mint(
    source.pubkey,
    source.secret,
    10000,
    1,
    TOKEN_METADATA,
  );

  await mintInst.submit();

  console.log(mintInst);
  t.true(mintInst.isOk);
  const mint = mintInst.unwrap().data as string;

  const res = await Account.Associated.retryGetOrCreate(
    mint,
    source.pubkey,
    source.secret,
  );

  t.log('# associated token account: ', res);
  t.is(typeof res, 'string');
});
