import test from 'ava';
import { Node } from '~/node';
import { SplToken } from '~/suite-spl-token';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Account } from '../src';
import { KeypairAccount } from '~/types/account';

let source: KeypairAccount;
let feePayer: KeypairAccount;
const TOKEN_METADATA = {
  name: 'solana-suite-token',
  symbol: 'SST',
  royalty: 50,
  filePath: RandomAsset.get().filePath as string,
};

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  feePayer = obj.feePayer;
});

test('Retry getOrCreate', async (t) => {
  const mintInst = await SplToken.mint(
    source.secret,
    10000,
    1,
    TOKEN_METADATA,
    { feePayer: feePayer.secret },
  );
  const mintRes = await mintInst.submit();
  t.true(mintRes.isOk);
  await Node.confirmedSig(mintRes.unwrap());
  const mint = mintInst.unwrap().data!;
  const res = await Account.Associated.retryGetOrCreate(
    mint,
    source.pubkey,
    source.secret,
  );

  t.log('# associated token account: ', res);
  t.is(typeof res, 'string');
});
