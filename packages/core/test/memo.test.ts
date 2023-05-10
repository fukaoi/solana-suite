import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../shared/test/testSetup';
import { Memo, SolNative, SplToken } from '../src';
import { KeypairAccount, Node } from '../../shared/src/';
import { Pubkey } from '@solana-suite/shared';

let source: KeypairAccount;
let dest: KeypairAccount;
const DUMMY_DATA = 'dummy memo data';

describe('Memo', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
    dest = obj.dest;
  });

  it('encode', async () => {
    const res = Memo.encode(DUMMY_DATA);
    console.log(`# encoded: ${res}`, res);
    assert.equal(res.length, 15);
  });

  it('create instruction', async () => {
    const res = Memo.create(DUMMY_DATA, source.pubkey, source.secret);
    console.log(`# create: `, res);
    assert.isObject(res);
  });

  it('send memo by own', async () => {
    const inst = Memo.create(
      '{"memo": "send memo by own"}',
      source.pubkey,
      source.secret
    );

    const res = await inst.submit();
    assert.isTrue(res.isOk, res.unwrap());
    console.log('# tx signature: ', res.unwrap());
  });

  it('send memo and sol transfer by owner', async () => {
    const inst1 = Memo.create(
      `send memo and sol transfer: ${new Date()}`,
      dest.pubkey,
      source.secret
    );

    const inst2 = SolNative.transfer(
      source.pubkey,
      dest.pubkey,
      [source.secret],
      0.01 // Too low lamports, but  error occurs
    );

    const res = await [inst1, inst2].submit();
    assert.isTrue(res.isOk);
    console.log('# tx signature: ', res.unwrap());
  });

  it('send memo and spl-token transfer by owner', async () => {
    const inst = await SplToken.mint(source.pubkey, source.secret, 10000, 4, {
      name: 'Memo spl-token',
      symbol: 'MST',
      uri: 'https://ipfs.io/ipfs/bafkreidm6xq7rognuapkmqweeco6vfo2hsgf7lndqttgxx6nnegc472qgi',
    });

    const sig = await inst.submit();
    await Node.confirmedSig(sig.unwrap());

    const inst1 = Memo.create(
      `send memo and spl-token transfer: ${new Date()}`,
      dest.pubkey,
      source.secret
    );

    const inst2 = await SplToken.transfer(
      inst.unwrap().data as Pubkey,
      source.pubkey,
      dest.pubkey,
      [source.secret],
      7777,
      4
    );

    (await [inst1, inst2].submit()).match(
      (ok) => console.log('# tx signature: ', ok),
      (err) => assert.fail(err.message)
    );
  });

  it('[Err] Over max limit', async () => {
    const overData = 'a'.repeat(2000);
    const inst = Memo.create(overData, source.pubkey, source.secret);

    const res = await inst.submit();
    assert.isTrue(res.isErr);
  });
});
