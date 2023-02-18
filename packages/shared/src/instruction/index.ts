import {
  sendAndConfirmTransaction,
  TransactionSignature,
  Keypair,
  TransactionInstruction,
  Transaction,
  ConfirmOptions,
} from '@solana/web3.js';

import { Node, Result, Try } from '../';
import { MAX_RETRIES } from './define';

export class Instruction {
  instructions: TransactionInstruction[];
  signers: Keypair[];
  feePayer?: Keypair;
  data?: unknown;

  constructor(
    instructions: TransactionInstruction[],
    signers: Keypair[],
    feePayer?: Keypair,
    data?: unknown
  ) {
    this.instructions = instructions;
    this.signers = signers;
    this.feePayer = feePayer;
    this.data = data;
  }

  submit = async (): Promise<Result<TransactionSignature, Error>> => {
    return Try(async () => {
      if (!(this instanceof Instruction)) {
        throw Error('only Instruction object that can use this');
      }
      const transaction = new Transaction();
      let finalSigners = this.signers;
      if (this.feePayer) {
        transaction.feePayer = this.feePayer.publicKey;
        finalSigners = [this.feePayer, ...this.signers];
      }

      this.instructions.forEach((inst) => transaction.add(inst));

      const options: ConfirmOptions = {
        maxRetries: MAX_RETRIES,
      };

      return await sendAndConfirmTransaction(
        Node.getConnection(),
        transaction,
        finalSigners,
        options
      );
    });
  };
}
