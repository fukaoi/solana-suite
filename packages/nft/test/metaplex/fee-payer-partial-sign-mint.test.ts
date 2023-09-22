import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Metaplex } from '../../src/metaplex';
import { RandomAsset } from '../../../internals/storage/test/randomAsset';
import { KeypairAccount } from '@solana-suite/shared';
import { Storage } from '../../../internals/storage';
import { InfraSideInput, Royalty } from '../../../internals/shared-metaplex';

let source: KeypairAccount;
describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('[Nft Storage] mint nft with partial sing fee payer', async () => {
    const owner = KeypairAccount.create();
    const freezeAuthority = KeypairAccount.create();
    const asset = RandomAsset.get();
    const serialized = await Metaplex.feePayerPartialSignMint(
      owner.pubkey,
      owner.secret,
      {
        filePath: asset.filePath as string,
        storageType: 'nftStorage',
        name: asset.name!,
        symbol: asset.symbol!,
        royalty: 50,
        isMutable: true,
      },
      source.pubkey,
      freezeAuthority.pubkey,
    );

    assert.isTrue(serialized.isOk, `${serialized.unwrap()}`);

    if (serialized.isOk) {
      (await serialized.value.submit(source.secret)).match(
        (ok: string) => {
          console.log('# mint:', serialized.value.data);
          console.log('# sig:', ok);
        },
        (ng: Error) => assert.fail(ng.message),
      );
    }
  });

  it('[Arweave] use case arweave', async () => {
    const royalty = 60;
    const owner = KeypairAccount.create();
    const asset = RandomAsset.get();
    const sellerFeeBasisPoints = Royalty.convert(royalty);

    const offchaindata: InfraSideInput.Offchain = {
      name: asset.name,
      symbol: asset.symbol,
      description: 'upload meta and content',
      seller_fee_basis_points: sellerFeeBasisPoints,
    };

    const uploaded = await Storage.uploadMetaAndContent(
      offchaindata,
      asset.filePath,
      'arweave',
      source.secret,
    );
    if (uploaded.isErr) {
      throw uploaded;
    }
    const uri = uploaded.value;

    const serialized = await Metaplex.feePayerPartialSignMint(
      owner.pubkey,
      owner.secret,
      {
        uri,
        name: asset.name!,
        symbol: asset.symbol!,
        royalty,
        isMutable: true,
      },
      source.pubkey,
    );

    assert.isTrue(serialized.isOk, `${serialized.unwrap()}`);

    if (serialized.isOk) {
      (await serialized.value.submit(source.secret)).match(
        (ok: string) => {
          console.log('# mint:', serialized.value.data);
          console.log('# sig:', ok);
        },
        (ng: Error) => assert.fail(ng.message),
      );
    }
  });

  it('[Error]Raise parameter error when not need uri or filePath', async () => {
    const owner = KeypairAccount.create();
    const asset = RandomAsset.get();
    const res = await Metaplex.feePayerPartialSignMint(
      owner.pubkey,
      owner.secret,
      {
        name: asset.name!,
        symbol: asset.symbol!,
        royalty: 50,
        isMutable: true,
      },
      source.pubkey,
    );
    res.match(
      (_: unknown) => assert.fail('Unrecognized error'),
      (err: Error) => {
        assert.equal(
          err.message,
          `Must set 'storageType=nftStorage + filePath' or 'uri'`,
        );
      },
    );
  });
});
