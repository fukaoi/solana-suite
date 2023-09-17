import { describe, expect, it } from '@jest/globals';
import { Keypair, PublicKey } from '@solana/web3.js';
import { KeypairAccount } from '../src/keypair-account';
import { Pubkey } from '../src/types/keypair-account';
import '../src/global';
import bs from 'bs58';

const PUBKEY = '6KJBDz6qPZZyJ9gAWXSgHufqAzU8pnhQmVdTitfusYS5';
const SECRET =
  '5K8YJqfs8Zs6fkRK9UyuX1TvSchofkwodQHciDpmw3zzEE3Tkiuyg6jes2FtmvQNETafE5tqfrb7ssYUMmEggWwF';

describe('KeypairStr', () => {
  it('Pubkey to PublicKey', async () => {
    const res = PUBKEY.toPublicKey();
    expect(res).toEqual(new PublicKey(PUBKEY));
  });

  it('Secret to SecretKey', async () => {
    const res = SECRET.toKeypair();
    expect(res).toEqual(Keypair.fromSecretKey(bs.decode(SECRET)));
  });

  it('Failed convert string to PublicKey', async () => {
    expect(() => 'failed-publickey'.toPublicKey()).toThrow();
  });

  it('Failed convert string to SecretKey', async () => {
    expect(() => 'failed-secretKey'.toKeypair()).toThrow();
  });

  it('Create KeyPair Object', async () => {
    const obj = new KeypairAccount({ pubkey: PUBKEY, secret: SECRET });
    expect(obj).toBeDefined();
  });

  it('is Pubkey', async () => {
    for (let index = 0; index < 50; index++) {
      expect(KeypairAccount.isPubkey(KeypairAccount.create().pubkey)).toBe(
        true,
      );
    }
  });

  it('is Secret', async () => {
    for (let index = 0; index < 50; index++) {
      expect(KeypairAccount.isSecret(KeypairAccount.create().secret)).toBe(
        true,
      );
    }
  });

  it('Keypair to KeyPair', async () => {
    const keypair = Keypair.generate();
    const expeted = {
      pubkey: keypair.publicKey.toString(),
      secret: bs.encode(keypair.secretKey).toString(),
    };
    const res = KeypairAccount.toKeyPair(keypair);
    expect(res).toEqual(expeted);
  });

  it('Pubkey', async () => {
    const pubkey = '0AWTL3RSxNe2mN7uS6MUvyWmBDBXUDQRNQftrS1R6baS';

    const func = (address: Pubkey) => {
      console.log(address);
    };
    func(pubkey as Pubkey);
  });
});
