import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { SplToken, KeypairStr, Multisig } from '../../src/';
import { RandomAsset } from '@solana-suite/storage/test/randomAsset';
import { StorageType } from '@solana-suite/shared-metaplex';
import { Node } from '@solana-suite/shared';

let source: KeypairStr;
let dest: KeypairStr;
let mintStr: string;

const TOKEN_TOTAL_AMOUNT = 10000000;
const MINT_DECIMAL = 2;
const TOKEN_METADATA = {
  name: 'solana-suite-token',
  symbol: 'SST',
  royalty: 50,
  filePath: RandomAsset.get().filePath as string,
  storageType: 'nftStorage' as StorageType,
};

describe('SplToken', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('Create token', async () => {
    const inst = await SplToken.mint(
      source.toPublicKey(),
      [source.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      TOKEN_METADATA
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);
  });

  it.only('Create token with multisig', async () => {
    const signer1 = KeypairStr.create();
    const signer2 = KeypairStr.create();
    const multisigInst = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
    ]);

    const res = await multisigInst.submit();
    res.isErr && assert.fail(res.unwrap());
    await Node.confirmedSig(res.unwrap());
    const multisig = multisigInst.unwrap().data as string;

    console.log('# multisig address :', multisig);
    console.log('# signer1 address :', signer1.pubkey);
    console.log('# signer2 address :', signer2.pubkey);

    const inst = await SplToken.mint(
      multisig.toPublicKey(),
      [signer1.toKeypair(), signer2.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      TOKEN_METADATA,
      source.toKeypair()
    );

    assert.isTrue(inst.isOk, `${inst.unwrap()}`);

    const res2 = await inst.submit();
    assert.isTrue(res2.isOk, res2.unwrap());
    mintStr = inst.unwrap().data as string;
    console.log('# mint: ', mintStr);
  });

  it('[Err]lack signer for multisig', async () => {
    const signer1 = KeypairStr.create();
    const signer2 = KeypairStr.create();
    const multisigInst = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
    ]);

    const res = await multisigInst.submit();
    res.isErr && assert.fail(res.unwrap());
    await Node.confirmedSig(res.unwrap());
    const multisig = multisigInst.unwrap().data as string;

    const mint = await SplToken.mint(
      multisig.toPublicKey(),
      [signer1.toKeypair(), signer2.toKeypair()],
      TOKEN_TOTAL_AMOUNT,
      MINT_DECIMAL,
      TOKEN_METADATA
    );

    const res2 = await mint.submit();
    assert.isFalse(res2.isOk);
  });
});
