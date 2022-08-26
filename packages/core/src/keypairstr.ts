import { Keypair, PublicKey } from '@solana/web3.js';
import bs from 'bs58';
import { Pubkey, Secret } from './types/keypairstr';

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

  static create = (): KeypairStr => {
    const keypair = Keypair.generate();
    return new KeypairStr(
      keypair.publicKey.toBase58() as Pubkey,
      bs.encode(keypair.secretKey) as Secret
    );
  };
}
