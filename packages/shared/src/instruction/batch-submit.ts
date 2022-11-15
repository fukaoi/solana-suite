import {
  sendAndConfirmTransaction,
  TransactionSignature,
  Transaction,
  ConfirmOptions,
} from '@solana/web3.js';

import { Node } from '../';
import { MAX_RETRIES } from './define';
import { Instruction as _Index } from './index';

//@internals
export class Instruction {
  static batchSubmit = async (arr: _Index[]): Promise<TransactionSignature> => {
    let i = 0;
    for (const a of arr) {
      if (!a.instructions && !a.signers) {
        throw Error(
          `only Instruction object that can use batchSubmit().
            Index: ${i}, Set value: ${JSON.stringify(a)}`
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
      options
    );
  };
}
