import { Pubkey, Secret } from '~/types/account';
import { Result } from '~/suite-utils';
import {
  Keypair,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

export type CommonStructure<T = undefined> = {
  instructions: TransactionInstruction[];
  signers: Keypair[];
  feePayer?: Keypair;
  canSubmit?: boolean;
  data?: T;
  submit: () => Promise<Result<TransactionSignature, Error>>;
};

export type MintStructure<T = Pubkey> = {
  instructions: TransactionInstruction[];
  signers: Keypair[];
  data: T;
  feePayer: Keypair;
  canSubmit?: boolean;
  submit: () => Promise<Result<TransactionSignature, Error>>;
};

export type PartialSignStructure<T = Pubkey> = {
  hexInstruction: string;
  canSubmit?: boolean;
  data?: T;
  submit: (feePayer: Secret) => Promise<Result<string, Error>>;
};
