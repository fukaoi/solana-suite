import { Keypair as Original, PublicKey } from '@solana/web3.js';
import { Pubkey, Secret } from '~/types/account';
import bs from 'bs58';

export namespace Account {
  export class Keypair {
    secret: Secret;
    pubkey: Pubkey;

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

    toKeypair(): Original {
      const decoded = bs.decode(this.secret);
      return Original.fromSecretKey(decoded);
    }

    static isPubkey = (value: string): value is Pubkey =>
      /^[0-9a-zA-Z]{32,44}$/.test(value);

    static isSecret = (value: string): value is Secret =>
      /^[0-9a-zA-Z]{87,88}$/.test(value);

    static create = (): Keypair => {
      const keypair = Original.generate();
      return new Keypair({
        pubkey: keypair.publicKey.toString() as Pubkey,
        secret: bs.encode(keypair.secretKey) as Secret,
      });
    };

    static toKeyPair = (keypair: Original): Keypair => {
      return new Keypair({
        pubkey: keypair.publicKey.toString() as Pubkey,
        secret: bs.encode(keypair.secretKey) as Secret,
      });
    };
  }
}
