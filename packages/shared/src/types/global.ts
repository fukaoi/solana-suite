import { Keypair, PublicKey, TransactionSignature } from '@solana/web3.js';
import { Instruction } from '..';
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

  interface Array<T extends Instruction> {
    submit(): Promise<Result<TransactionSignature, Error>>;
  }

  interface Console {
    debug(data: unknown, data2?: unknown, data3?: unknown): void;
  }

  interface Object {
    overwrite(willKey: string, willValue: unknown): Object;
  }
}
