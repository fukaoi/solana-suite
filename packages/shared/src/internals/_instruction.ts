import {
  sendAndConfirmTransaction,
  TransactionSignature,
  Transaction,
  ConfirmOptions,
} from '@solana/web3.js';

import { Node, Result } from '../';
import { Instruction, MAX_RETRIES } from '../instruction';

// @internal
export class Internals_Instruction {
  static batchSubmit = async (
    arr: Instruction[]
  ): Promise<Result<TransactionSignature, Error>> => {
    let i = 0;
    for (const a of arr) {
      if (!a.instructions && !a.signers) {
        return Result.err(
          Error(
            `only Instruction object that can use batchSubmit().
            Index: ${i}, Set value: ${JSON.stringify(a)}`
          )
        );
      }
      i++;
    }

    const instructions = arr.flatMap((a) => a.instructions);
    const signers = arr.flatMap((a) => a.signers);
    const feePayers = arr.filter((a) => a.feePayer !== undefined);
    let feePayer = signers[0];
    if (feePayers.length > 0) {
      feePayer = feePayers[0].feePayer!;
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
      options
    )
      .then(Result.ok)
      .catch(Result.err);
  };
}
