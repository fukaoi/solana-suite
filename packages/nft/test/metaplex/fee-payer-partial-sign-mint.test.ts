import { describe, it } from 'mocha';
import { assert } from 'chai';
import { KeypairStr } from '@solana-suite/core';
import { Setup } from '../../../shared/test/testSetup';
import { Metaplex } from '../../src/metaplex';
import { RandomAsset } from '../randomAsset';

let source: KeypairStr;

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it.only('[nftStorage]mint nft', async () => {
    const owner = KeypairStr.create();
    const asset = RandomAsset.get();

    const creator1 = {
      address: 'CGDRajhcFo9ysuUjBsbwCQHKJuCHiXeEUrMKSot1eyay'.toPublicKey(),
      share: 70,
      verified: false,
    };

    const creator2 = {
      address: '93MwWVSZHiPS9VLay4ywPcTWmT4twgN2nxdCgSx6uFTk'.toPublicKey(),
      share: 30,
      verified: false,
    };

    const serialized = await Metaplex.feePayerPartialSignMint(
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
      owner.toKeypair(),
      source.toPublicKey()
    );
    assert.isTrue(serialized.isOk, `${serialized.unwrap()}`);
    if (serialized.isOk) {
      const res = await serialized.value.submit(source.toKeypair());
      assert.isTrue(res.isOk, `${res.unwrap()}`);
      console.log('# tx signature: ', res.unwrap());
      console.log('# mint: ', serialized.value.data);
    }
  });
});
