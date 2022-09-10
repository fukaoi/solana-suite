import { PublicKey, Keypair, TransactionSignature } from '@solana/web3.js';
import { Result } from '../result';

declare global {
  interface String {
    toPublicKey(): PublicKey;
    toKeypair(): Keypair;
    toExplorerUrl(): string;
    toAddressUrl(): string;
  }

  interface Number {
    toSol(): number;
    toLamports(): number;
  }

  interface Array<T> {
    submit(): Promise<Result<TransactionSignature, Error>>;
  }

  interface Console {
    debug(data: unknown, data2?: unknown, data3?: unknown): void;
  }
}
