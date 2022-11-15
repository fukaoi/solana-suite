import { describe, it, before } from 'mocha';
import { SolNative, Multisig, KeypairStr } from '../../src';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';

let source: KeypairStr;
let dest: KeypairStr;

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('transfer transaction with multi sig', async () => {
    const signer1 = KeypairStr.create();
    const signer2 = KeypairStr.create();
    const inst1 = await Multisig.create(2, source.toKeypair(), [
      signer1.toPublicKey(),
      signer2.toPublicKey(),
    ]);

    let multisig!: string;

    (await inst1.submit()).match(
      (_) => {
        multisig = inst1.unwrap().data as string;
        console.log('# multisig: ', multisig);
      },
      (err) => assert.fail(err.message)
    );

    const inst2 = await SolNative.transferWithMultisig(
      multisig.toPublicKey(),
      dest.toPublicKey(),
      [source.toKeypair(), signer1.toKeypair(), signer2.toKeypair()],
      0.01,
      source.toKeypair()
    );

    (await inst2.submit()).match(
      (sig) => console.log('# signature: ', sig),
      (err) => assert.fail(err.message)
    );
  });
});
