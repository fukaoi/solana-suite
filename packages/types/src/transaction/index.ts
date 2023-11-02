import {
  Keypair,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';
import { Pubkey, Secret } from '../account';
import { Result } from '../shared';

export type Transaction = {
  instructions: TransactionInstruction[];
  signers: Keypair[];
  feePayer?: Keypair;
  data?: unknown;
  constructor: (
    instructions: TransactionInstruction[],
    signers: Keypair[],
    feePayer?: Keypair,
    data?: unknown,
  ) => void;
  submit: () => Promise<Result<TransactionSignature, Error>>;
  batchSubmit: (arr: Transaction[]) => Promise<TransactionSignature>;
};

export type MintTransaction = {
  constructor: (
    instructions: TransactionInstruction[],
    signers: Keypair[],
    feePayer?: Keypair,
    data?: unknown,
  ) => void;
  submit: () => Promise<Result<TransactionSignature, Error>>;
};

export type PartialSignTransaction = {
  hexInstruction: string;
  data?: Pubkey;
  constructor: (instructions: string, mint?: Pubkey) => void;
  submit: (feePayer: Secret) => Promise<Result<TransactionSignature, Error>>;
};

declare global {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  interface Array<T> {
    submit(): Promise<Result<TransactionSignature, Error>>;
  }
}
