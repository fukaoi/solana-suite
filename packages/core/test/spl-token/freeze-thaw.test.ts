import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken } from '../../src/spl-token';
import { RandomAsset } from '../../../storage/test/randomAsset';
import { KeypairAccount, Node } from '../../../shared';
import { Pubkey } from '../../../shared/src';

let feePayer: KeypairAccount;

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    feePayer = obj.source;
  });

  it('Freezing and Thawing a target nft', async () => {
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
      freezeAuthority.pubkey
    );

    const mint = inst1.unwrap().data as Pubkey;
    assert.isTrue(KeypairAccount.isPubkey(mint));

    (await inst1.submit()).match(
      async (ok: string) => {
        await Node.confirmedSig(ok);
        console.log('# mint:', mint);
        console.log('# mint sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message)
    );

    // freeze
    const inst2 = SplToken.freeze(
      mint,
      owner.pubkey,
      freezeAuthority.secret,
      feePayer.secret
    );
    (await inst2.submit()).match(
      async (ok: string) => {
        await Node.confirmedSig(ok);
        console.log('# freeze sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message)
    );

    // thaw
    const inst3 = SplToken.thaw(
      mint,
      owner.pubkey,
      freezeAuthority.secret,
      feePayer.secret
    );
    (await inst3.submit()).match(
      async (ok: string) => {
        await Node.confirmedSig(ok);
        console.log('# thaw sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message)
    );
  });
});
