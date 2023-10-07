import test from 'ava';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { TraditionalNft } from '../src/';
import { KeypairAccount } from '~/account';
import { Pubkey } from '~/types/account';

let source: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('[Nft Storage] mint nft and nft burn', async (t) => {
  const owner = KeypairAccount.create();
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
    source.secret,
  );

  let mint: Pubkey;
  (await inst1.submit()).match(
    async (ok: string) => {
      mint = inst1.unwrap().data as Pubkey;
      t.true(KeypairAccount.isPubkey(mint));
      t.log('# mint:', inst1.unwrap().data);
      t.log('# sig:', ok);
      return ok;
    },
    (ng: Error) => t.fail(ng.message),
  );

  const inst2 = TraditionalNft.burn(
    mint!,
    owner.pubkey,
    owner.secret,
    source.secret,
  );
  (await inst2.submit()).match(
    (ok: string) => {
      t.log('# sig:', ok);
    },
    (ng: Error) => t.fail(ng.message),
  );
});
