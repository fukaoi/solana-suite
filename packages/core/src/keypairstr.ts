import { Keypair, PublicKey } from '@solana/web3.js';
import { Pubkey, Secret } from './types/keypairstr';
import bs from 'bs58';

export class KeypairStr {
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

  static create = (): KeypairStr => {
    const keypair = Keypair.generate();
    return new KeypairStr(
      keypair.publicKey.toBase58() as Pubkey,
      bs.encode(keypair.secretKey) as Secret
    );
  };
}
