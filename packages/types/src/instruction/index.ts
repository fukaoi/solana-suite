import {
  Keypair,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';
import { Result } from '../shared/result';
import { Pubkey, Secret } from '../account';

export type Instruction = {
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
  batchSubmit: (arr: Instruction[]) => Promise<TransactionSignature>;
};

export type MintInstruction = {
  constructor: (
    instructions: TransactionInstruction[],
    signers: Keypair[],
    feePayer?: Keypair,
    data?: unknown,
  ) => void;
  submit: () => Promise<Result<TransactionSignature, Error>>;
};

export type PartialSignInstruction = {
  hexInstruction: string;
  data?: Pubkey;
  constructor: (instructions: string, mint?: Pubkey) => void;
  submit: (feePayer: Secret) => Promise<Result<TransactionSignature, Error>>;
};
