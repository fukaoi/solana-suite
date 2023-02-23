import { Keypair, PublicKey } from '@solana/web3.js';
import { Pubkey, Secret } from './types/keypair-account';
import bs from 'bs58';

export class KeypairAccount {
  pubkey: Pubkey;
  secret: Secret;

  constructor(params: { pubkey?: Pubkey; secret: Secret }) {
    if (!params.pubkey) {
      const keypair = params.secret.toKeypair();
      this.pubkey = keypair.publicKey.toString();
    } else {
      this.pubkey = params.pubkey;
    }
    this.secret = params.secret;
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
    /^[0-9a-zA-Z]{87, 88}$/.test(value);

  static create = (): KeypairAccount => {
    const keypair = Keypair.generate();
    return new KeypairAccount({
      pubkey: keypair.publicKey.toString() as Pubkey,
      secret: bs.encode(keypair.secretKey) as Secret,
    });
  };

  static toKeyPair = (keypair: Keypair): KeypairAccount => {
    return new KeypairAccount({
      pubkey: keypair.publicKey.toString() as Pubkey,
      secret: bs.encode(keypair.secretKey) as Secret,
    });
  };
}
