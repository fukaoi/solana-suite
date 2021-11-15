import {
  sendAndConfirmTransaction,
  TransactionSignature,
  Signer,
  TransactionInstruction,
  Transaction,
} from '@solana/web3.js';

import {Node, Result} from './';

export interface InstructionSubmit {
  sig: TransactionSignature,
  value: unknown|unknown[]
}

export class Instruction {
  instructions: TransactionInstruction[];
  signers: Signer[];
  feePayer?: Signer;
  value?: unknown;

  constructor(
    instructions: TransactionInstruction[],
    signers: Signer[],
    feePayer?: Signer,
    value?: unknown,
  ) {
    this.instructions = instructions;
    this.signers = signers;
    this.feePayer = feePayer;
    this.value = value;
  }

  submit = async ()
    : Promise<Result<InstructionSubmit, Error>> => {
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
      .then(sig => Result.ok({sig, value: this.value}))
      .catch(Result.err);
  }

  // @internal
  static batchSubmit = async (
    arr: Instruction[]
  ): Promise<Result<InstructionSubmit, Error>> => {
    const instructions = arr.flatMap(a => a.instructions);
    const signers = arr.flatMap(a => a.signers);
    const feePayers = arr.filter(a => a.feePayer !== undefined);
    let feePayer = signers[0];
    if (feePayers.length > 0) {
      feePayer = feePayers[0].feePayer!;
    }
    const values = arr.map(a => {if (a.value) return a.value});

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
      .then(sig => Result.ok({sig, value: values}))
      .catch(Result.err);
  }
}
