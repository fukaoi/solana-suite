import {
  sendAndConfirmTransaction,
  TransactionSignature,
  Signer,
  TransactionInstruction,
  Transaction
} from '@solana/web3.js';

import {Node, Result} from './';

// @internal
export namespace Instruction {
  export const submit = async (
    instructions: TransactionInstruction[],
    signers: Signer[],
    feePayer?: Signer,
  )
    : Promise<Result<TransactionSignature, Error>> => {

    const transaction = new Transaction();
    let finalSigners = signers;
    if (feePayer) {
      transaction.feePayer = feePayer.publicKey;
      finalSigners = [feePayer, ...signers];
    }
    instructions.map(inst => transaction.add(inst));
    return await sendAndConfirmTransaction(
      Node.getConnection(),
      transaction,
      finalSigners
    )
      .then(Result.ok)
      .catch(Result.err);
  }
}
