import {
  ConfirmOptions,
  Keypair,
  sendAndConfirmTransaction,
  Transaction as Tx,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import { Node } from '~/node';
import { Result, Try } from '~/shared';

// TODO: create class type, rename class name:  Transaction.Common
export class Transaction {
  static MAX_RETRIES = 3;

  instructions: TransactionInstruction[];
  signers: Keypair[];
  feePayer?: Keypair;
  data?: unknown;

  constructor(
    instructions: TransactionInstruction[],
    signers: Keypair[],
    feePayer?: Keypair,
    data?: unknown,
  ) {
    this.instructions = instructions;
    this.signers = signers;
    this.feePayer = feePayer;
    this.data = data;
  }

  submit = async (): Promise<Result<TransactionSignature, Error>> => {
    return Try(async () => {
      if (!(this instanceof Transaction)) {
        throw Error('only Instruction object that can use this');
      }
      const transaction = new Tx();

      const blockhashObj = await Node.getConnection().getLatestBlockhash();
      transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
      transaction.recentBlockhash = blockhashObj.blockhash;
      let finalSigners = this.signers;

      if (this.feePayer) {
        transaction.feePayer = this.feePayer.publicKey;
        finalSigners = [this.feePayer, ...this.signers];
      }

      this.instructions.forEach((inst) => transaction.add(inst));

      const options: ConfirmOptions = {
        maxRetries: Transaction.MAX_RETRIES,
      };

      return await sendAndConfirmTransaction(
        Node.getConnection(),
        transaction,
        finalSigners,
        options,
      );
    });
  };
}
