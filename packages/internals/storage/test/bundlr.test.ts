import { expect, beforeAll, describe, it } from '@jest/globals';
import { Setup } from '../../../shared/test/testSetup';
import { KeypairAccount } from '@solana-suite/shared';
import { Bundlr } from '../src/bundlr';
import {
  BundlrStorageDriver,
  Metaplex as MetaplexFoundation,
} from '@metaplex-foundation/js';

let source: KeypairAccount;

describe('Bundlr', () => {
  beforeAll(async () => {
    const obj = await Setup.generateKeyPair();
    source = obj.source;
  });

  it('Call MetaplexFoundation', async () => {
    const res = Bundlr.make(source.toKeypair());
    expect(typeof res).toBe('object');
    expect(res instanceof MetaplexFoundation).toBe(true);
  });

  it('Call storage driver', async () => {
    const res = Bundlr.useStorage(source.toKeypair());
    expect(typeof res).toBe('object');
    expect(res instanceof BundlrStorageDriver).toBe(true);
  });
});
