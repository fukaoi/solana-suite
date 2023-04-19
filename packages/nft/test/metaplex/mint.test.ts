import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Metaplex } from '../../src/metaplex';
import { RandomAsset } from '../../../storage/test/randomAsset';
import { User, ValidatorError } from '../../../shared-metaplex/';
import { KeypairAccount } from '../../../shared';
import { Pubkey } from '../../../shared/src';

let source: KeypairAccount;

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('[Arweave] mint nft', async () => {
    const asset = RandomAsset.get();
    const res = await Metaplex.mint(source.pubkey, source.secret, {
      filePath: asset.filePath as string,
      storageType: 'arweave',
      name: asset.name!,
      symbol: asset.symbol!,
      royalty: 50,
      isMutable: true,
    });

    assert.isTrue(KeypairAccount.isPubkey(res.unwrap().data as Pubkey));

    (await res.submit()).match(
      (ok: string) => {
        console.log('# mint:', res.unwrap().data);
        console.log('# sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message)
    );
  });

  it('[Nft Storage] mint nft with fee payer', async () => {
    const owner = KeypairAccount.create();
    const asset = RandomAsset.get();
    const res = await Metaplex.mint(
      owner.pubkey,
      owner.secret,
      {
        filePath: asset.filePath as string,
        storageType: 'nftStorage',
        name: asset.name!,
        symbol: asset.symbol!,
        royalty: 0,
      },
      source.secret
    );

    assert.isTrue(KeypairAccount.isPubkey(res.unwrap().data as Pubkey));

    (await res.submit()).match(
      (ok: string) => {
        console.log('# mint:', res.unwrap().data);
        console.log('# sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message)
    );
  });

  it.only('[Nft Storage] mint nft with many optional datas', async () => {
    const asset = RandomAsset.get();
    const creators: User.Creators[] = [];
    const owner = KeypairAccount.create();

    creators.push({
      address: owner.pubkey,
      share: 60,
      verified: false,
    });

    creators.push({
      address: 'G2Fjvm2ab1xxwMxLPFRSmuEDcX8jzsg2L1gFK4MKMkt5',
      share: 40,
      verified: false,
    });

    const properties = {
      files: [
        {
          filePath: asset.filePath,
          fileName: 'properties image',
          fileType: 'image/jpg',
        },
      ],
    };

    const collection = '2XgApg3pcPkyNxoHr8N6bWtZ4gG5W6iV3MksJ3brLmRZ';

    const attributes = [
      {
        trait_type: 'hair',
        value: 'brown',
      },
      {
        trait_type: 'eye',
        value: 'blue',
      },
    ];

    const options = {
      github_url: 'https://github.com/atonoy/solana-suite',
      docs_url:
        'https://solana-suite.gitbook.io/solana-suite-develpoment-guide/',
    };

    const res = await Metaplex.mint(
      owner.pubkey,
      owner.secret,
      {
        filePath: asset.filePath as string,
        storageType: 'nftStorage',
        name: asset.name!,
        symbol: asset.symbol!,
        royalty: 50,
        creators,
        properties,
        collection,
        attributes,
        options,
      },
      source.secret,
      owner.secret
    );

    assert.isTrue(KeypairAccount.isPubkey(res.unwrap().data as Pubkey));

    (await res.submit()).match(
      (ok: string) => {
        console.log('# mint:', res.unwrap().data);
        console.log('# sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message)
    );
  });

  it('[Error]Raise validation error when upload meta data', async () => {
    const res = await Metaplex.mint(source.pubkey, source.secret, {
      filePath: '',
      name: '',
      symbol: 'LONG-SYMBOL-LONG',
      royalty: -100,
      storageType: 'nftStorage',
    });

    res.match(
      (_: unknown) => assert.fail('Unrecognized error'),
      (_: unknown) => {
        (err: ValidatorError) => {
          assert.isNotEmpty(err.message);
          console.log(err.details);
        };
      }
    );
  });

  it('[Error]Raise parameter error when not need uri or filePath', async () => {
    const owner = KeypairAccount.create();
    const asset = RandomAsset.get();
    const res = await Metaplex.mint(owner.pubkey, owner.secret, {
      name: asset.name!,
      symbol: asset.symbol!,
      royalty: 50,
      isMutable: true,
    });
    res.match(
      (_: unknown) => assert.fail('Unrecognized error'),
      (err) => {
        assert.equal(err.message, `Must set 'storageType + filePath' or 'uri'`);
      }
    );
  });
});
