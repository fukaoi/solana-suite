import { Keypair, PublicKey } from '@solana/web3.js';
declare global {
  interface String {
    toPublicKey(): PublicKey;
    toKeypair(): Keypair;
    toExplorerUrl(explorer?: Explorer): string;
  }
  interface Number {
    toSol(): number;
    toLamports(): number;
  }

  interface Console {
    debug(data: unknown, data2?: unknown, data3?: unknown): void;
  }

  interface Secret {
    toKeypair(): Keypair;
  }

  interface Pubkey {
    toPublicKey(): PublicKey;
  }
}

export enum Explorer {
  Solscan = 'solscan',
  SolanaFM = 'solanafm',
}
