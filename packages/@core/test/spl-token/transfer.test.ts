import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken } from '../../src/';
import { RandomAsset } from '../../../internals/storage/test/randomAsset';
import { KeypairAccount } from '@solana-suite/shared';

let source: KeypairAccount;
let dest: KeypairAccount;
const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;
const TOKEN_METADATA = {
  name: 'solana-suite-token',
  symbol: 'SST',
  royalty: 50,
  filePath: RandomAsset.get().filePath as string,
  storageType: 'nftStorage',
  isMutable: false,
};

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('Create token, batch transfer', async () => {
    const inst1 = await SplToken.mint(
      source.pubkey,
      source.secret,
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      TOKEN_METADATA
    );

    assert.isTrue(inst1.isOk, `${inst1.unwrap()}`);
    const token = inst1.unwrap().data as string;
    (await inst1.submit()).match(
      (ok: string) => {
        console.log('# mint: ', token);
        console.log('# mint signature: ', ok);
      },
      (err: Error) => {
        assert.fail(err.message);
      }
    );

    const inst2 = await SplToken.transfer(
      token,
      source.pubkey,
      dest.pubkey,
      [source.secret],
      1,
      MINT_DECIMAL,
      source.secret
    );

    const inst3 = await SplToken.transfer(
      token,
      source.pubkey,
      dest.pubkey,
      [source.secret],
      1,
      MINT_DECIMAL,
      source.secret
    );

    (await [inst2, inst3].submit()).match(
      (ok) => {
        console.log('# transfer signature: ', ok);
      },
      (err) => {
        assert.fail(err.message);
      }
    );
  });
});