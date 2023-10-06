import test from 'ava';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { SplToken } from '../src';
import { Pubkey } from '~/types/account';
import { Node } from '~/node';
import { KeypairAccount } from '~/account';

let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  feePayer = obj.source;
});

test('Freezing and Thawing a target nft', async (t) => {
  // mint
  const owner = KeypairAccount.create();
  const freezeAuthority = KeypairAccount.create();
  const inst1 = await SplToken.mint(
    owner.pubkey,
    owner.secret,
    10000000,
    2,
    {
      name: 'solana-suite-token',
      symbol: 'SST',
      filePath: RandomAsset.get().filePath as string,
      storageType: 'nftStorage',
      royalty: 50,
    },
    feePayer.secret,
    freezeAuthority.pubkey,
  );

  const mint = inst1.unwrap().data as Pubkey;
  t.true(KeypairAccount.isPubkey(mint));

  (await inst1.submit()).match(
    async (ok: string) => {
      await Node.confirmedSig(ok);
      t.log('# mint:', mint);
      t.log('# mint sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );

  // freeze
  const inst2 = SplToken.freeze(
    mint,
    owner.pubkey,
    freezeAuthority.secret,
    feePayer.secret,
  );
  (await inst2.submit()).match(
    async (ok: string) => {
      await Node.confirmedSig(ok);
      t.log('# freeze sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );

  // thaw
  const inst3 = SplToken.thaw(
    mint,
    owner.pubkey,
    freezeAuthority.secret,
    feePayer.secret,
  );
  (await inst3.submit()).match(
    async (ok: string) => {
      await Node.confirmedSig(ok);
      t.log('# thaw sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});
