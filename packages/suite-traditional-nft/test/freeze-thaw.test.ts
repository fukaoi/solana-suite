import test from 'ava';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { Pubkey } from '~/types/account';
import { KeypairAccount } from '~/account';
import { Node } from '~/node';
import { TraditionalNft } from '../src/';

let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  feePayer = obj.source;
});

test('Freezing and Thawing a target nft', async (t) => {
  // mint
  const owner = KeypairAccount.create();
  const freezeAuthority = KeypairAccount.create();
  const asset = RandomAsset.get();
  const inst1 = await TraditionalNft.mint(
    owner.pubkey,
    owner.secret,
    {
      filePath: asset.filePath as string,
      storageType: 'nftStorage',
      name: asset.name!,
      symbol: asset.symbol!,
      royalty: 0,
    },
    feePayer.secret,
    freezeAuthority.pubkey,
  );

  const mint = inst1.unwrap().data as Pubkey;
  t.true(KeypairAccount.isPubkey(mint));

  (await inst1.submit()).match(
    async (ok: string) => {
      await Node.confirmedSig(ok);
      console.log('# mint:', mint);
      console.log('# mint sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );

  // freeze
  const inst2 = TraditionalNft.freeze(
    mint,
    owner.pubkey,
    freezeAuthority.secret,
    feePayer.secret,
  );
  (await inst2.submit()).match(
    async (ok: string) => {
      await Node.confirmedSig(ok);
      console.log('# freeze sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );

  // thaw
  const inst3 = TraditionalNft.thaw(
    mint,
    owner.pubkey,
    freezeAuthority.secret,
    feePayer.secret,
  );
  (await inst3.submit()).match(
    async (ok: string) => {
      await Node.confirmedSig(ok);
      console.log('# thaw sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});
