import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Account, KeypairStr, Multisig, } from '@solana-suite/core';
import {Setup} from '../../../shared/test/testSetup';
import {Metaplex} from '../../src/metaplex';
import {RandomAsset} from '../randomAsset';
import {StorageArweave} from '../../src';

let source: KeypairStr;
let dest: KeypairStr;

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it.only('Mint nft, Separate processing', async () => {
    const asset = RandomAsset.storage();
    const upload = await StorageArweave.uploadContent(
      asset.image!,
      source.toKeypair()
    );

    assert.isTrue(upload.isOk, upload.unwrap());
    const imageUri = upload.unwrap();

    const uploadMetadata = await StorageArweave.uploadMetadata({
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

    const res = await Metaplex.mint({
      name: asset.name,
      uri: uri,
      symbol: asset.symbol,
      sellerFeeBasisPoints: 50,
      creators: [creator1, creator2],
      isMutable: true,
    },
      source.toKeypair()
    );

    (await res.submit()).match(
      ok => {
        console.log('# mint:', res.unwrap().data);
        console.log('# sig:', ok);
      },
      ng => assert.fail(ng.message) 
    );
  });

  it('Mint nft and Burn nft', async () => {
  });

  it('Mint batched nft', async () => {
  });

  it('Transfer nft', async () => {
  });

  it('Transfer nft with fee payer', async () => {
  });

  it('Transfer nft with multi sig', async () => {

    // create multisig
    const signer1 = Account.create();
    const signer2 = Account.create();

    const multisig = await Multisig.create(
      2,
      source.toKeypair(),
      [
        signer1.toPublicKey(),
        signer2.toPublicKey(),
      ]
    );

    const resMulti = await multisig.submit();

    assert(resMulti.isOk, `${resMulti.unwrap()}`);

    const multisigAddress = multisig.unwrap().data as string;

    console.log('# multisig address: ', multisigAddress);

  });
});
