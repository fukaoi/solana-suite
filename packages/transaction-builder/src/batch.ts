import {
  ConfirmOptions,
  sendAndConfirmTransaction,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';

import { Node } from '~/node';
import { MAX_RETRIES, TransactionBuilder as Common } from './common';
import { TransactionBuilder as Mint } from './mint';
import { Try } from '../../shared/src/shared';
import { Result } from '../../shared/src/result';

export namespace TransactionBuilder {
  export class Batch {
    submit = async (
      arr: Common.Common[] | Mint.Mint[],
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

        const options: ConfirmOptions = {
          maxRetries: MAX_RETRIES,
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
}
