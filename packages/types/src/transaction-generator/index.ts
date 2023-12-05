import {
  Keypair,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';
import { Pubkey, Secret } from '../account';
import { Result } from '../shared';

// interface 
// parameter: {
//  instructions: TransactionInstruction[];
//  signers: Keypair[];
//  feePayer?: Keypair;
//  data?: unknown;
// }


// export interface TxGenerator {
//   instructions: TransactionInstruction[];
//   signers: Keypair[];
//   feePayer?: Keypair;
//   data?: unknown;
// }

export interface TxGeneratorHex {
  hexInstruction: string;
}

// declare global {
//   // TODO: refactoring
//   // Batch transaction
//   /* eslint-disable @typescript-eslint/no-unused-vars */
//   interface Array<T> {
//     submit(feePayer?: Secret): Promise<Result<TransactionSignature, Error>>;
//   }
// }
