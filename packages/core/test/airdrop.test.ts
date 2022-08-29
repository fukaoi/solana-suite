import { describe, it } from 'mocha';
import { assert } from 'chai';
import { Setup } from '../../shared/test/testSetup';
import { Airdrop } from '../src/airdrop';
import { KeypairStr, SolNative } from '../src/';

let source: KeypairStr;

describe('Airdrop', () => {
  before(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Request airdrop with 1 SOL', async () => {
    const res = await Airdrop.request(source.toPublicKey(), 1);
    assert.isTrue(res.isOk, res.unwrap());
    const info = await SolNative.findByOwner(source.toPublicKey());
    assert.isNumber(info.unwrap().sol);
  });
});
