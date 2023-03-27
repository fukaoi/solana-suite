import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { Metaplex } from '../../src/metaplex';
import { RandomAsset } from '../../../storage/test/randomAsset';
import { KeypairAccount } from '../../../shared';

let source: KeypairAccount;

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('[Nft Storage] mint nft with partial sing fee payer', async () => {
    const owner = KeypairAccount.create();
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
      source.pubkey
    );

    assert.isTrue(serialized.isOk, `${serialized.unwrap()}`);

    if (serialized.isOk) {
      (await serialized.value.submit(source.secret)).match(
        (ok: string) => {
          // console.log('# mint:', res.unwrap().data);
          console.log('# sig:', ok);
        },
        (ng: Error) => assert.fail(ng.message)
      );
    }
  });
});
