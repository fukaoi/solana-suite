import {
  ConfirmOptions,
  sendAndConfirmTransaction,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';

import { Node } from '~/node';
import { Constants, Result, Try } from '~/suite-utils';
import { TransactionBuilder as PriorityFee } from './priority-fee';
import { BatchSubmitOptions } from '~/types/transaction-builder';

export namespace TransactionBuilder {
  export class Batch {
    submit = async (
      options: Partial<BatchSubmitOptions> = {},
    ): Promise<Result<TransactionSignature, Error>> => {
      return Try(async () => {
        if (!options.instructions) {
          throw Error('Not found options.instructions');
        }
        const commonOrMintInst = options.instructions;
        let i = 0;
        for (const inst of commonOrMintInst) {
          if (!inst.instructions && !inst.signers) {
            throw Error(
              `only Instruction object that can use batchSubmit().
            Index: ${i}, Set value: ${JSON.stringify(inst)}`,
            );
          }
          i++;
        }

        const instructions = commonOrMintInst.flatMap(
          (inst) => inst.instructions,
        );
        const signers = commonOrMintInst.flatMap((inst) => inst.signers);
        const feePayers = commonOrMintInst.filter(
          (inst) => inst.feePayer !== undefined,
        );
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
          transaction.add(
            await PriorityFee.PriorityFee.createInstruction(
              instructions,
              options.addSolPriorityFee,
            ),
          );
        }
        const confirmOptions: ConfirmOptions = {
          maxRetries: Constants.MAX_TRANSACTION_RETRIES,
        };
        return await sendAndConfirmTransaction(
          Node.getConnection(),
          transaction,
          finalSigners,
          confirmOptions,
        );
      });
    };
  }
}
