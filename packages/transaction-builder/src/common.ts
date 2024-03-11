import {
  ConfirmOptions,
  Keypair,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import { Node } from '~/node';
import { Result, Try } from '~/suite-utils';
import { CommonStructure, SubmitOptions } from '~/types/transaction-builder';
import { TransactionBuilder as PriorityFee } from './priority-fee';

export const MAX_RETRIES = 3;

export namespace TransactionBuilder {
  export class Common<T = undefined> implements CommonStructure<T> {
    static MAX_TRANSACTION_SIZE = 1232;

    instructions: TransactionInstruction[];
    signers: Keypair[];
    feePayer?: Keypair;
    data?: T;

    constructor(
      instructions: TransactionInstruction[],
      signers: Keypair[],
      feePayer?: Keypair,
      data?: T,
    ) {
      this.instructions = instructions;
      this.signers = signers;
      this.feePayer = feePayer;
      this.data = data;
    }

    submit = async (
      options: Partial<SubmitOptions> = {},
    ): Promise<Result<TransactionSignature, Error>> => {
      return Try(async () => {
        if (!(this instanceof Common)) {
          throw Error('only Instruction object that can use this');
        }
        const transaction = new Transaction();

        const blockhashObj = await Node.getConnection().getLatestBlockhash();
        transaction.lastValidBlockHeight = blockhashObj.lastValidBlockHeight;
        transaction.recentBlockhash = blockhashObj.blockhash;
        let finalSigners = this.signers;

        if (this.feePayer) {
          transaction.feePayer = this.feePayer.publicKey;
          finalSigners = [this.feePayer, ...this.signers];
        }

        this.instructions.forEach((inst) => transaction.add(inst));

        if (options.isPriorityFee) {
          return await PriorityFee.PriorityFee.submit(
            transaction,
            finalSigners,
            options.addSolPriorityFee,
          );
        } else {
          const confirmOptions: ConfirmOptions = {
            maxRetries: MAX_RETRIES,
          };
          return await sendAndConfirmTransaction(
            Node.getConnection(),
            transaction,
            finalSigners,
            confirmOptions,
          );
        }
      });
    };
  }
}
