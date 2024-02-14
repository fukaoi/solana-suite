import {
  ConfirmOptions,
  sendAndConfirmTransaction,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';

import { Node } from '~/node';
import { MAX_RETRIES } from './common';
import { Result, Try } from '~/suite-utils';
import { TransactionBuilder as PriorityFee } from './priority-fee';
import {
  CommonStructure,
  MintStructure,
  SubmitOptions,
} from '~/types/transaction-builder';

export namespace TransactionBuilder {
  export class Batch {
    submit = async (
      arr: CommonStructure[] | MintStructure[],
      options: Partial<SubmitOptions> = {},
    ): Promise<Result<TransactionSignature, Error>> => {
      return Try(async () => {
        let i = 0;
        for (const a of arr) {
          if (!a.instructions && !a.signers) {
            throw Error(
              `only Instruction object that can use batchSubmit().
            Index: ${i}, Set value: ${JSON.stringify(a)}`,
            );
          }
          i++;
        }

        const instructions = arr.flatMap((a) => a.instructions);
        const signers = arr.flatMap((a) => a.signers);
        const feePayers = arr.filter((a) => a.feePayer !== undefined);
        let feePayer = signers[0];
        if (feePayers.length > 0 && feePayers[0].feePayer) {
          feePayer = feePayers[0].feePayer;
        }

        const transaction = new Transaction();
        let finalSigners = signers;
        if (feePayer) {
          transaction.feePayer = feePayer.publicKey;
          finalSigners = [feePayer, ...signers];
        }
        instructions.map((inst) => transaction.add(inst));

        // CalculateTxsize.isMaxTransactionSize(transaction, feePayer.publicKey);

        if (options.isPriorityFee) {
          return await PriorityFee.PriorityFee.submit(
            transaction,
            finalSigners,
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
