import { describe, it } from 'mocha';
import { assert } from 'chai';
import { PublicKey, Keypair } from '@solana/web3.js';
import { KeyPair } from '../src/key-pair';
import { Pubkey } from '../src/types/key-pair';
import '../src/global';
import bs from 'bs58';

const PUBKEY = '6KJBDz6qPZZyJ9gAWXSgHufqAzU8pnhQmVdTitfusYS5';
const SECRET =
  '5K8YJqfs8Zs6fkRK9UyuX1TvSchofkwodQHciDpmw3zzEE3Tkiuyg6jes2FtmvQNETafE5tqfrb7ssYUMmEggWwF';

describe('KeypairStr', () => {
  it('Pubkey to PublicKey', async () => {
    const res = PUBKEY.toPublicKey();
    assert.deepEqual(res, new PublicKey(PUBKEY));
  });

  it('Secret to SecretKey', async () => {
    const res = SECRET.toKeypair();
    assert.deepEqual(res, Keypair.fromSecretKey(bs.decode(SECRET)));
  });

  it('Failed convert string to PublicKey', async () => {
    assert.throws(() => 'failed-publickey'.toPublicKey());
  });

  it('Failed convert string to SecretKey', async () => {
    assert.throws(() => 'failed-secretKey'.toKeypair());
  });

  it('Create KeyPair Object', async () => {
    const obj = new KeyPair({ pubkey: PUBKEY, secret: SECRET });
    assert.isNotEmpty(obj);
  });

  it('is Pubkey', async () => {
    assert.isTrue(KeyPair.isPubkey(PUBKEY));
  });

  it('is Secret', async () => {
    const secret =
      '54SjeQxyNVS6xkNrqDSQ5aKyMCu7gzySku2p6UnPqF83NDDRfHsVrXQtiEVtsn7t5QWRCTm2VGmwkmjzxcSoYexa';
    assert.isTrue(KeyPair.isSecret(secret));
  });

  it('Keypair to KeyPair', async () => {
    const keypair = Keypair.generate();
    const expeted = {
      pubkey: keypair.publicKey.toString(),
      secret: bs.encode(keypair.secretKey).toString(),
    };
    const res = KeyPair.toKeyPair(keypair);
    assert.deepEqual(res, expeted);
  });

  it('Pubkey', async () => {
    const pubkey = '0AWTL3RSxNe2mN7uS6MUvyWmBDBXUDQRNQftrS1R6baS';

    const func = (address: Pubkey) => {
      console.log(address);
    };
    func(pubkey as Pubkey);
  });
});
