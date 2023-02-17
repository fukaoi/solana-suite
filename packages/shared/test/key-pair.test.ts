import { describe, it } from 'mocha';
import { assert } from 'chai';
import { PublicKey } from '@solana/web3.js';
import { KeyPair } from '../src/key-pair';
import { Pubkey } from '../src/types/key-pair';
import '../src/global';

describe('KeypairStr', () => {
  it('Pubkey to PublicKey', async () => {
    const pubkey = '6KJBDz6qPZZyJ9gAWXSgHufqAzU8pnhQmVdTitfusYS5';
    const res = pubkey.toPublicKey();
    assert.deepEqual(res, new PublicKey(pubkey));
  });

  it('Secret to SecretKey', async () => {
    const secret = '6KJBDz6qPZZyJ9gAWXSgHufqAzU8pnhQmVdTitfusYS5';
    const res = secret.toKeypair();
    // assert.deepEqual(res, new PublicKey(secret));
  });

  it('Account to PublicKey', async () => {
    const account = KeyPair.create();
    const res = account.toPublicKey();
    assert.deepEqual(res, new PublicKey(account.pubkey));
  });

  it('Account to Keypair', async () => {
    const account = KeyPair.create();
    const res = account.toKeypair();
    assert.deepEqual(res, account.toKeypair());
  });

  it('is Pubkey', async () => {
    const pubkey = '0AWTL3RSxNe2mN7uS6MUvyWmBDBXUDQRNQftrS1R6baS';
    assert.isTrue(KeyPair.isPubkey(pubkey));
  });

  it('is Secret', async () => {
    const secret =
      '54SjeQxyNVS6xkNrqDSQ5aKyMCu7gzySku2p6UnPqF83NDDRfHsVrXQtiEVtsn7t5QWRCTm2VGmwkmjzxcSoYexa';
    assert.isTrue(KeyPair.isSecret(secret));
  });

  it('Pubkey', async () => {
    const pubkey = '0AWTL3RSxNe2mN7uS6MUvyWmBDBXUDQRNQftrS1R6baS';

    const func = (address: Pubkey) => {
      console.log(address);
    };
    func(pubkey as Pubkey);
  });
});
