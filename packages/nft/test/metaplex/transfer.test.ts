import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Airdrop } from '../../../core';
import { KeypairAccount, Pubkey } from '../../../shared';
import { Setup } from '../../../shared/test/testSetup';
import { Metaplex } from '../../src/metaplex';
import { RandomAsset } from '../../../storage/test/randomAsset';

let source: KeypairAccount;
let dest: KeypairAccount;

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('Transfer nft', async () => {
    const asset = RandomAsset.get();

    const creator1 = {
      address: source.toPublicKey(),
      share: 70,
      verified: false,
    };

    const creator2 = {
      address: '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk'.toPublicKey(),
      share: 30,
      verified: false,
    };

    const mint = await Metaplex.mint(source.pubkey, source.secret, {
      filePath: asset.filePath as string,
      storageType: 'arweave',
      name: asset.name!,
      symbol: asset.symbol!,
      royalty: 50,
      creators: [creator1, creator2],
      isMutable: true,
    });

    const resMint = await mint.submit();

    if (resMint.isErr) {
      assert.fail(resMint.error.message);
    }
    const res = await (
      await Metaplex.transfer(
        mint.unwrap().data as Pubkey,
        source.pubkey,
        dest.pubkey,
        [source.secret]
      )
    ).submit();

    res.match(
      (ok: string) => {
        console.log('# mint: ', mint.unwrap().data);
        console.log('# sig: ', ok);
      },
      (err: Error) => {
        assert.fail(err.message);
      }
    );
  });

  // every call requestAirdrop(), raise internal error
  it.skip('[Arweave] mint nft with feePayer', async () => {
    const feePayer = KeypairAccount.create();
    await Airdrop.request(feePayer.pubkey);
    const asset = RandomAsset.get();

    const creator1 = {
      address: source.toPublicKey(),
      share: 70,
      verified: false,
    };

    const creator2 = {
      address: '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk'.toPublicKey(),
      share: 30,
      verified: false,
    };

    const res = await Metaplex.mint(
      source.pubkey,
      source.secret,
      {
        filePath: asset.filePath as string,
        storageType: 'arweave',
        name: asset.name!,
        symbol: asset.symbol!,
        royalty: 50,
        creators: [creator1, creator2],
        isMutable: true,
      },
      feePayer.secret
    );

    (await res.submit()).match(
      (ok: string) => {
        console.log('# mint:', res.unwrap().data);
        console.log('# sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message)
    );
  });
});
