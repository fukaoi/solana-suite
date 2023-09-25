import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Metaplex } from '../../src/metaplex';
import { RandomAsset } from '../../../internals/storage/test/randomAsset';
import { KeypairAccount, Node, Pubkey } from '@solana-suite/shared';

let feePayer: KeypairAccount;

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    feePayer = obj.source;
  });

  it('Freezing and Thawing a target nft', async () => {
    // mint
    const owner = KeypairAccount.create();
    const freezeAuthority = KeypairAccount.create();
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
      feePayer.secret,
      freezeAuthority.pubkey,
    );

    const mint = inst1.unwrap().data as Pubkey;
    assert.isTrue(KeypairAccount.isPubkey(mint));

    (await inst1.submit()).match(
      async (ok: string) => {
        await Node.confirmedSig(ok);
        console.log('# mint:', mint);
        console.log('# mint sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message),
    );

    // freeze
    const inst2 = Metaplex.freeze(
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
      (ng: Error) => assert.fail(ng.message),
    );

    // thaw
    const inst3 = Metaplex.thaw(
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
      (ng: Error) => assert.fail(ng.message),
    );
  });
});
