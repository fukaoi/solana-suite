import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Metaplex } from '../../src/metaplex';
import { RandomAsset } from '../../../storage/test/randomAsset';
import { InputCreators, ValidatorError } from '../../../shared-metaplex/';
import { KeypairAccount, MintInstruction } from '../../../shared';
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

  it.only('[Nft Storage] mint nft', async () => {
    const asset = RandomAsset.get();
    const wallet = KeypairAccount.create();
    // const res = await Metaplex.mint(source.pubkey, source.secret, {
    const res = await Metaplex.mint(wallet.pubkey, wallet.secret, {
      filePath: asset.filePath as string,
      storageType: 'nftStorage',
      name: asset.name!,
      symbol: asset.symbol!,
      royalty: 50,
      isMutable: true,
    });

    assert.isTrue(KeypairAccount.isPubkey(res.unwrap().data as Pubkey));

    (res.unwrap() as MintInstruction).instructions.forEach(i => {
      // console.log();
    })
    return ;

    // (await res.submit()).match(
    (await res.submit(source.secret)).match(
      (ok: string) => {
        console.log('# mint:', res.unwrap().data);
        console.log('# sig:', ok);
      },
      (ng: Error) => assert.fail(ng.message)
    );
  });

  it('[Nft Storage] mint nft with many optional datas', async () => {
    const asset = RandomAsset.get();

    const creator1: InputCreators = {
      address: source.pubkey,
      share: 60,
      authority: source.secret,
    };

    const creator2: InputCreators = {
      address: 'G2Fjvm2ab1xxwMxLPFRSmuEDcX8jzsg2L1gFK4MKMkt5',
      share: 30,
      authority:
        '4HBrM8BTmEqb3wTTzMm77353e1yHC1aTgXJUqmtNovswEfK9SCwrwF56TmjEGakVBeYB17CpdbrSFy7SXaQHDbkR',
    };

    const creator3: InputCreators = {
      address: 'DtoMJQF8kUkePJ8YwcQt9cAKbWQFXmBXXNdq5USwJw3s',
      share: 10,
      authority:
        'HsJ144zNS1mc79HgzraFS6pLbfWBpd3zXrXmDM2zCoX9Kmra9Gg9wKc2WbF2JX5JsHz8fkTun7Dw3E8MtaeLKGH',
    };

    const collection = KeypairAccount.create().pubkey;

    const properties = {
      files: [
        {
          filePath: asset.filePath,
          fileName: 'properties image',
          fileType: 'image/jpg',
        },
      ],
    };

    const res = await Metaplex.mint(source.pubkey, source.secret, {
      filePath: asset.filePath as string,
      storageType: 'nftStorage',
      name: asset.name!,
      symbol: asset.symbol!,
      royalty: 30,
      description: 'This is Solana Suite test',
      external_url: 'https://atonoy.github.io/solana-suite/',
      creators: [creator1, creator2, creator3],
      isMutable: true,
      collection: collection,
      properties: properties,
      options: {
        github_url: 'https://github.com/atonoy/solana-suite',
        docs_url:
          'https://solana-suite.gitbook.io/solana-suite-develpoment-guide/',
      },
    });

    assert.isTrue(KeypairAccount.isPubkey(res.unwrap().data as Pubkey));

    (await res.submit()).match(
      (ok: string) => {
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
});
