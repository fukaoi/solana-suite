import { beforeAll, describe, expect, it } from '@jest/globals';
import { Multisig, SolNative, OnErr } from '../../src';
import { Setup } from '../../../shared/test/testSetup';
import { KeypairAccount } from '../../../shared/src/keypair-account';

let source: KeypairAccount;
let dest: KeypairAccount;

const onErr: OnErr = (err: Error) => {
  console.log('# error: ', err);
  expect(false).toBe(true);
};

describe('SolNative', () => {
  beforeAll(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('transfer transaction with multi sig', async () => {
    const signer1 = KeypairAccount.create();
    const signer2 = KeypairAccount.create();
    const inst1 = await Multisig.create(2, source.secret, [
      signer1.pubkey,
      signer2.pubkey,
    ]);

    let multisig!: string;

    (await inst1.submit()).match((_) => {
      multisig = inst1.unwrap().data as string;
      console.log('# multisig: ', multisig);
    }, onErr);

    const inst2 = await SolNative.transferWithMultisig(
      multisig,
      dest.pubkey,
      [signer1.secret, signer2.secret],
      0.01,
      source.secret,
    );

    (await inst2.submit()).match(
      (sig: string) => console.log('# signature: ', sig),
      onErr,
    );
  });
});
