import { describe, it, before } from 'mocha';
import { SolNative, Multisig } from '../../src';
import { assert } from 'chai';
import { Setup } from '../../../shared/test/testSetup';
import { KeyPair } from '../../../shared/src';

let source: KeyPair;
let dest: KeyPair;

describe('SolNative', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('transfer transaction with multi sig', async () => {
    const signer1 = KeyPair.create();
    const signer2 = KeyPair.create();
    const inst1 = await Multisig.create(2, source.secret, [
      signer1.pubkey,
      signer2.pubkey,
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
      multisig,
      dest.pubkey,
      [source.secret, signer1.secret, signer2.secret],
      0.01,
      source.secret
    );

    (await inst2.submit()).match(
      (sig) => console.log('# signature: ', sig),
      (err) => assert.fail(err.message)
    );
  });
});
