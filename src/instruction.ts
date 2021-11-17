import {
  sendAndConfirmTransaction,
  TransactionSignature,
  Signer,
  TransactionInstruction,
  Transaction,
} from '@solana/web3.js';

import {Node, Result} from './';

export class Instruction {
  instructions: TransactionInstruction[];
  signers: Signer[];
  feePayer?: Signer;
  data?: unknown;

  constructor(
    instructions: TransactionInstruction[],
    signers: Signer[],
    feePayer?: Signer,
    data?: unknown,
  ) {
    this.instructions = instructions;
    this.signers = signers;
    this.feePayer = feePayer;
    this.data = data;
  }

  submit = async ()
    : Promise<Result<TransactionSignature, Error>> => {
    // return Error if include Error object
    const transaction = new Transaction();
    let finalSigners = this.signers;
    if (this.feePayer) {
      transaction.feePayer = this.feePayer.publicKey;
      finalSigners = [this.feePayer, ...this.signers];
    }
    this.instructions.map(inst => transaction.add(inst));
    return await sendAndConfirmTransaction(
      Node.getConnection(),
      transaction,
      finalSigners
    )
      .then(Result.ok)
      .catch(Result.err);
  }

  // @internal
  static batchSubmit = async (
    arr: Instruction[]
  ): Promise<Result<TransactionSignature, Error>> => {
    const instructions = arr.flatMap(a => a.instructions);
    const signers = arr.flatMap(a => a.signers);
    const feePayers = arr.filter(a => a.feePayer !== undefined);
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

export class Instructions<T extends Instruction> extends Array<T> {
    public echo() {
      console.log(this);
    }
}

