import test from 'ava';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { RegularNft } from '../src/';
import { Account } from '~/account';
import { KeypairAccount } from '~/types/account';
import { Pubkey } from '~/types/account';

let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  feePayer = obj.feePayer;
});

test('[Nft Storage] mint nft and nft burn', async (t) => {
  const owner = Account.Keypair.create();
  const asset = RandomAsset.get();
  const inst1 = await RegularNft.mint(
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
  );

  let mint: Pubkey;
  (await inst1.submit()).match(
    async (ok: string) => {
      mint = inst1.unwrap().data as Pubkey;
      t.true(Account.Keypair.isPubkey(mint));
      t.log('# mint:', inst1.unwrap().data);
      t.log('# sig:', ok);
      return ok;
    },
    (ng: Error) => t.fail(ng.message),
  );

  const inst2 = RegularNft.burn(mint!, owner.pubkey, owner.secret, {
    feePayer: feePayer.secret,
  });
  (await inst2.submit()).match(
    (ok: string) => {
      t.log('# sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});
