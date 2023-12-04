import {
  ConfirmOptions,
  sendAndConfirmTransaction,
  Transaction as Tx,
  TransactionSignature,
} from '@solana/web3.js';

import { Node } from '~/node';
import { Try } from '~/shared';
import { MAX_RETRIES } from './define';
import { Transaction } from './common';

// TODO: rename Trasaction.Batch
export class BatchTransaction {
  submit = async (arr: Transaction[]): Promise<TransactionSignature> => {
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

    const transaction = new Tx();
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
  };
}

/**
 * senTransaction() TransactionInstruction
 *
 * @see {@link types/global.ts}
 * @returns Promise<Result<string, Error>>
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* @ts-ignore */
Array.prototype.submit = async function () {
  const instructions: Transaction[] = [];
  // dont use forEach
  // It is not possible to stop the process by RETURN in the middle of the process.
  return Try(async () => {
    let i = 0;
    for (const obj of this) {
      if (obj.isErr) {
        const errorMess: string = obj.error.message as string;
        throw Error(`[Array index of caught 'Result.err': ${i}]${errorMess}`);
      } else if (obj.isOk) {
        instructions.push(obj.value as Transaction);
      } else {
        instructions.push(obj as Transaction);
      }
      i++;
    }
    return new BatchTransaction().submit(instructions);
  });
};
