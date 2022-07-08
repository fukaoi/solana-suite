import {describe, it} from 'mocha';
import {assert} from 'chai'
import {Account, KeypairStr, Multisig, } from '@solana-suite/core';
import {Setup} from '../../../shared/test/testSetup';
import {Metaplex} from '../../src/metaplex';

let source: KeypairStr;
let dest: KeypairStr;

describe('Metaplex', () => {
  before(async () => {
    const obj = await Setup.generatekeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it.only('Mint nft', async () => {
    Metaplex.mint();
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
