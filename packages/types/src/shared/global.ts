import { Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
import { Result } from './result';

declare global {
  interface Number {
    toSol(): number;
    toLamports(): number;
  }

  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface Array<T> {
    submit(): Promise<Result<TransactionSignature, Error>>;
  }

  interface Console {
    debug(data: unknown, data2?: unknown, data3?: unknown): void;
  }
}

export type AnyObject = {
  [key: string]: unknown;
};

export type OverwriteObject = {
  existsKey: string;
  will: { key: string; value: unknown };
};
