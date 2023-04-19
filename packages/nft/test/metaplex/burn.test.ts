import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Metaplex } from '../../src/metaplex';
import { RandomAsset } from '../../../storage/test/randomAsset';
import { KeypairAccount } from '../../../shared';
import { Pubkey } from '../../../shared/src';

let source: KeypairAccount;

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('[Nft Storage] mint nft and nft burn', async () => {
    const owner = KeypairAccount.create();
    const asset = RandomAsset.get();
    const inst1 = await Metaplex.mint(
      owner.pubkey,
      owner.secret,
      {
        filePath: asset.filePath as string,
        storageType: 'nftStorage',
        name: asset.name!,
        symbol: asset.symbol!,
        royalty: 0,
      },
      source.secret
    );

    let mint: Pubkey;
    (await inst1.submit()).match(
      async (ok: string) => {
        mint = inst1.unwrap().data as Pubkey;
        assert.isTrue(KeypairAccount.isPubkey(mint));
        console.log('# mint:', inst1.unwrap().data);
        console.log('# sig:', ok);
        return ok;
      },
      (ng: Error) => assert.fail(ng.message)
    );

    const inst2 = Metaplex.burn(
      mint!,
      owner.pubkey,
      [owner.secret],
      source.secret
    );
    (await inst2.submit()).match(
      (ok: string) => {
        console.log('# sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message)
    );
  });

  it.only('burn script', async () => {
    const mint = 'BsjjAPgHMW3qCesAvpsRaNx7kFxcYFYCCZ2wnpXzuFgN';
    const owner = new KeypairAccount({
      pubkey: '6yVHt5qgGnGZ3rGJoX9dX5zKpWgvmz5rLgzco77HiW2H',
      secret:
        '5K8YJqfs8Zs6fkRK9UyuX1TvSchofkwodQHciDpmw3zzEE3Tkiuyg6jes2FtmvQNETafE5tqfrb7ssYUMmEggWwF',
    });
    const res = Metaplex.burn(mint, owner.pubkey, [owner.secret]);
    (await res.submit()).match(
      (ok: string) => {
        console.log('# sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message)
    );
  });
});
