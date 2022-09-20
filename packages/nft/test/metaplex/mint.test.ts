import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Airdrop, KeypairStr } from '@solana-suite/core';
import { Setup } from '../../../shared/test/testSetup';
import { Metaplex } from '../../src/metaplex';
import { RandomAsset } from '../randomAsset';
import { ValidatorError } from '../../src';

let source: KeypairStr;

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('[Arweave] mint nft', async () => {
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
      {
        filePath: asset.filePath as string,
        storageType: 'arweave',
        name: asset.name!,
        symbol: asset.symbol!,
        royalty: 50,
        creators: [creator1, creator2],
        isMutable: true,
      },
      source.toKeypair()
    );

    (await res.submit()).match(
      (ok: string) => {
        console.log('# mint:', res.unwrap().data);
        console.log('# sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message)
    );
  });

  it('[Arweave] mint nft with feePayer', async () => {
    const feePayer = KeypairStr.create();
    await Airdrop.request(feePayer.toPublicKey());
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
      {
        filePath: asset.filePath as string,
        storageType: 'arweave',
        name: asset.name!,
        symbol: asset.symbol!,
        royalty: 50,
        creators: [creator1, creator2],
        isMutable: true,
      },
      source.toKeypair(),
      feePayer.toKeypair()
    );

    (await res.submit()).match(
      (ok: string) => {
        console.log('# mint:', res.unwrap().data);
        console.log('# sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message)
    );
  });

  it('[Nft Storage] mint nft', async () => {
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
      {
        filePath: asset.filePath as string,
        storageType: 'nftStorage',
        name: asset.name!,
        symbol: asset.symbol!,
        royalty: 20,
        creators: [creator1, creator2],
        isMutable: true,
        options: {
          createdBy: 'Solana Suite',
          poweredBy: 'Solana',
          creators: [creator1, creator2],
        },
      },
      source.toKeypair()
    );

    (await res.submit()).match(
      (ok) => {
        console.log('# mint:', res.unwrap().data);
        console.log('# sig:', ok);
      },
      (ng: Error) => {
        console.log(ng);
        assert.fail(ng.message);
      }
    );
  });

  it('Raise validation error when upload meta data', async () => {
    const res = await Metaplex.mint(
      {
        filePath: '',
        name: '',
        symbol: 'LONG-SYMBOL-LONG',
        royalty: -100,
        storageType: 'nftStorage',
      },
      source.toKeypair()
    );

    res.match(
      (_) => assert.fail('Unrecognized error'),
      (_) => {
        (err: ValidatorError) => {
          assert.isNotEmpty(err.message);
          console.log(err.details);
        };
      }
    );
  });
});
