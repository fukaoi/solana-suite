import test from 'ava';
import { Setup } from 'test-tools/setup';
import { RandomAsset } from 'test-tools/setupAsset';
import { RegularNft } from '../src/';
import { Account } from '~/account';
import { KeypairAccount } from '~/types/account';
import { Storage } from '~/suite-storage';
import { Converter } from '~/converter';

let source: KeypairAccount;
let feePayer: KeypairAccount;

test.before(async () => {
  const obj = await Setup.generateKeyPair();
  source = obj.source;
  feePayer = obj.feePayer;
});

test('[Nft Storage] mint nft with fee payer', async (t) => {
  const owner = Account.Keypair.create();
  const freezeAuthority = Account.Keypair.create();
  const asset = RandomAsset.get();
  const serialized = await RegularNft.gasLessMint(
    owner.secret,
    {
      filePath: asset.filePath as string,
      name: asset.name!,
      symbol: asset.symbol!,
      royalty: 50,
      isMutable: true,
    },
    feePayer.pubkey,
    {
      freezeAuthority: freezeAuthority.pubkey,
    },
  );

  t.true(serialized.isOk, `${serialized.unwrap()}`);

  if (serialized.isOk) {
    (await serialized.submit({ feePayer: feePayer.secret })).match(
      (ok: string) => {
        t.log('# mint:', serialized.value.data);
        t.log('# sig:', ok);
      },
      (ng: Error) => t.fail(ng.message),
    );
  }
});

test('[Arweave] use case arweave', async (t) => {
  const royalty = 60;
  const owner = Account.Keypair.create();
  const asset = RandomAsset.get();
  const sellerFeeBasisPoints = Converter.Royalty.intoInfra(royalty);

  const offchaindata = {
    name: asset.name,
    symbol: asset.symbol,
    description: 'upload meta and content',
    seller_fee_basis_points: sellerFeeBasisPoints,
  };

  const uploaded = await Storage.upload(
    offchaindata,
    asset.filePath,
    'arweave',
    source.secret,
  );
  if (uploaded.isErr) {
    throw uploaded;
  }
  const uri = uploaded.value;

  const serialized = await RegularNft.gasLessMint(
    owner.secret,
    {
      uri,
      name: asset.name!,
      symbol: asset.symbol!,
      royalty,
      isMutable: true,
    },
    feePayer.pubkey,
  );

  t.true(serialized.isOk, `${serialized.unwrap()}`);

  if (serialized.isOk) {
    (await serialized.value.submit({ feePayer: feePayer.secret })).match(
      (ok: string) => {
        t.log('# mint:', serialized.value.data);
        t.log('# sig:', ok);
      },
      (ng: Error) => t.fail(ng.message),
    );
  }
});

test('[Error]Raise parameter error when not need uri or filePath', async (t) => {
  const owner = Account.Keypair.create();
  const asset = RandomAsset.get();
  const res = await RegularNft.gasLessMint(
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
    () => t.fail('Unrecognized error'),
    (err: Error) => {
      t.is(err.message, "Must set filePath' or 'uri'");
    },
  );
});
