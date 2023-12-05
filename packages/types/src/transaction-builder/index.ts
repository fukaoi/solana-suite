import { Secret } from '~/types/account';
import { Result } from '~/shared';
import {
  Keypair,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

export interface StructPartialSignTransaction {
  hexInstruction: string;
  submit: (feePayer: Secret) => Promise<Result<string, Error>>;
}
export interface StructTransaction {
  instructions: TransactionInstruction[];
  signers: Keypair[];
  feePayer?: Keypair;
  data?: unknown;
  submit: () => Promise<Result<TransactionSignature, Error>>;
}
