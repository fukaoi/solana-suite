import { describe, it, expect, beforeAll } from '@jest/globals';
import { Setup } from '../../shared/test/testSetup';
import { Airdrop } from '../src/airdrop';
import { SolNative } from '../src/';
import { KeypairAccount } from '../../shared';

let source: KeypairAccount;

describe.skip('Airdrop', () => {
  beforeAll(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Request airdrop with 1 SOL', async () => {
    const res = await Airdrop.request(source.pubkey, 1);
    expect(res.isOk).toBe(true);
    const info = await SolNative.findByOwner(source.pubkey);
    expect(typeof info.unwrap().sol).toBe('number');
  });
});
