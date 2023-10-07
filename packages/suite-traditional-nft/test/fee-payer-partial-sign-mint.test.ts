import test from 'ava';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { TraditionalNft } from '../src/';
import { KeypairAccount } from '~/account';
import { Storage } from '~/storage';
import { InfraSideInput } from '~/types/converter';
import { Converter } from '~/converter';

let source: KeypairAccount;
test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
});

test('[Nft Storage] mint nft with partial sing fee payer', async (t) => {
  const owner = KeypairAccount.create();
  const freezeAuthority = KeypairAccount.create();
  const asset = RandomAsset.get();
  const serialized = await TraditionalNft.feePayerPartialSignMint(
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

  t.true(serialized.isOk, `${serialized.unwrap()}`);

  if (serialized.isOk) {
    (await serialized.value.submit(source.secret)).match(
      (ok: string) => {
        console.log('# mint:', serialized.value.data);
        console.log('# sig:', ok);
      },
      (ng: Error) => t.fail(ng.message),
    );
  }
});

test('[Arweave] use case arweave', async (t) => {
  const royalty = 60;
  const owner = KeypairAccount.create();
  const asset = RandomAsset.get();
  const sellerFeeBasisPoints = Converter.Royalty.intoInfraSide(royalty);

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

  const serialized = await TraditionalNft.feePayerPartialSignMint(
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

  t.true(serialized.isOk, `${serialized.unwrap()}`);

  if (serialized.isOk) {
    (await serialized.value.submit(source.secret)).match(
      (ok: string) => {
        console.log('# mint:', serialized.value.data);
        console.log('# sig:', ok);
      },
      (ng: Error) => t.fail(ng.message),
    );
  }
});

test('[Error]Raise parameter error when not need uri or filePath', async (t) => {
  const owner = KeypairAccount.create();
  const asset = RandomAsset.get();
  const res = await TraditionalNft.feePayerPartialSignMint(
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
    (_: unknown) => t.fail('Unrecognized error'),
    (err: Error) => {
      t.is(
        err.message,
        `Must set 'storageType=nftStorage + filePath' or 'uri'`,
      );
    },
  );
});
