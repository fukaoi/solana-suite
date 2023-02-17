import { Keypair, PublicKey } from '@solana/web3.js';
import { Pubkey, Secret } from './types/key-pair';
import bs from 'bs58';

export class KeyPair {
  pubkey: Pubkey;
  secret: Secret;

  constructor(pubkey: Pubkey, secret: Secret) {
    this.pubkey = pubkey;
    this.secret = secret;
  }

  toPublicKey(): PublicKey {
    return new PublicKey(this.pubkey);
  }

  toKeypair(): Keypair {
    const decoded = bs.decode(this.secret);
    return Keypair.fromSecretKey(decoded);
  }
  
  static isPubkey = (value: string): value is Pubkey =>
    /^[0-9a-zA-Z]{32,44}$/.test(value);

  static isSecret = (value: string): value is Secret =>
    /^[0-9a-zA-Z]{88}$/.test(value);

  static create = (): KeyPair => {
    const keypair = Keypair.generate();
    return new KeyPair(
      keypair.publicKey.toBase58() as Pubkey,
      bs.encode(keypair.secretKey) as Secret
    );
  };
}
