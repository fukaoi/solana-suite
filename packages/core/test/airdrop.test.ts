import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../shared/test/testSetup';
import { Airdrop } from '../src/airdrop';
import { SolNative } from '../src/';
import { KeyPair } from '../../shared';

let source: KeyPair;

describe.skip('Airdrop', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Request airdrop with 1 SOL', async () => {
    const res = await Airdrop.request(source.pubkey, 1);
    assert.isTrue(res.isOk, res.unwrap());
    const info = await SolNative.findByOwner(source.pubkey);
    assert.isNumber(info.unwrap().sol);
  });
});
