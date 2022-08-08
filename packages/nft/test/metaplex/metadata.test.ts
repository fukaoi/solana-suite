import { describe, it } from 'mocha';
import { assert } from 'chai';
import { KeypairStr } from '@solana-suite/core';
import { Setup } from '../../../shared/test/testSetup';
import { RandomAsset } from '../randomAsset';
import { StorageArweave } from '../../src/storage/arweave';
import {MetaplexMetadata} from '../../src/metaplex/metadata';
import {StorageNftStorage} from '../../src';

let source: KeypairStr;

describe('MetaplexMetadata', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('[Arweave]Mint nft', async () => {
    const asset = RandomAsset.get();
    console.log('[step1] upload content(image, movie, file,,,)');
    const upload = await StorageArweave.uploadContent(
      asset.filePath as string,
      source.toKeypair()
    );

    assert.isTrue(upload.isOk, upload.unwrap());
    const imageUri = upload.unwrap();

    console.log('[step2] upload metadata for metaplex(usually text data)');
    const uploadMetadata = await StorageArweave.uploadMetadata(
      {
        image: imageUri,
        name: asset.name,
        symbol: asset.symbol,
      },
      source.toKeypair()
    );

    assert.isTrue(uploadMetadata.isOk, uploadMetadata.unwrap());
    const uri = uploadMetadata.unwrap();

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

    console.log('[step3] mint on Solana');
    const res = await MetaplexMetadata.create(
      {
        name: asset.name,
        uri,
        symbol: asset.symbol,
        sellerFeeBasisPoints: 50,
        creators: [creator1, creator2],
        isMutable: true,
      },
      source.toPublicKey(),
      source.toKeypair()
    );

    (await res.submit()).match(
      (ok) => {
        console.log('# mint:', res.unwrap().data);
        console.log('# sig:', ok);
      },
      (ng) => assert.fail(ng.message)
    );
  });

  it.only('[NFTStorage]Mint nft', async () => {
    const asset = RandomAsset.get();
    console.log('[step1] upload content(image, movie, file,,,)');
    const upload = await StorageNftStorage.uploadContent(
      asset.filePath as string,
    );

    assert.isTrue(upload.isOk, upload.unwrap());
    const imageUri = upload.unwrap();

    console.log('[step2] upload metadata for metaplex(usually text data)');
    const uploadMetadata = await StorageNftStorage.uploadMetadata(
      {
        image: imageUri,
        name: asset.name,
        symbol: asset.symbol,
      },
    );

    assert.isTrue(uploadMetadata.isOk, uploadMetadata.unwrap());
    const uri = uploadMetadata.unwrap();

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

    console.log('[step3] mint on Solana');
    const res = await MetaplexMetadata.create(
      {
        name: asset.name,
        uri,
        symbol: asset.symbol,
        sellerFeeBasisPoints: 50,
        creators: [creator1, creator2],
        isMutable: true,
      },
      source.toPublicKey(),
      source.toKeypair()
    );

    (await res.submit()).match(
      (ok) => {
        console.log('# mint:', res.unwrap().data);
        console.log('# sig:', ok);
      },
      (ng) => assert.fail(ng.message)
    );
  });
});
