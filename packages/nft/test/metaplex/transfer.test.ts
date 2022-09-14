import { describe, it } from 'mocha';
import { assert } from 'chai';
import { KeypairStr } from '@solana-suite/core';
import { Setup } from '../../../shared/test/testSetup';
import { Metaplex } from '../../src/metaplex';
import { RandomAsset } from '../randomAsset';

let source: KeypairStr;
let dest: KeypairStr;

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

    const mint = await Metaplex.mint(
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

    const resMint = await mint.submit();

    if (resMint.isErr) {
      assert.fail(resMint.error.message);
    }
    const res = await (
      await Metaplex.transfer(
        (mint.unwrap().data as string).toPublicKey(),
        source.toPublicKey(),
        dest.toPublicKey(),
        [source.toKeypair()]
      )
    ).submit();

    res.match(
      (ok) => {
        console.log('# mint: ', mint.unwrap().data);
        console.log('# sig: ', ok);
      },
      (err) => {
        assert.fail(err.message);
      }
    );
  });
});
