import {
  sendAndConfirmTransaction,
  TransactionSignature,
  Signer,
  TransactionInstruction,
  Transaction,
  PublicKey,
} from '@solana/web3.js';

import {Node, Result} from './';

import {Buffer} from 'buffer';
import * as BufferLayout from '@solana/buffer-layout';

export class Instruction {
  instructions: TransactionInstruction[];
  signers: Signer[];
  feePayer?: Signer;

  constructor(
    instructions: TransactionInstruction[],
    signers: Signer[],
    feePayer?: Signer,
  ) {
    this.instructions = instructions;
    this.signers = signers;
    this.feePayer = feePayer;
  }

  submit = async (): Promise<Result<TransactionSignature, Error>> => {
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
    const feePayer = arr.filter(a => a.feePayer !== undefined)[0].feePayer;

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

  // @internal
  static pubkeyToBuffer = (publicKey: PublicKey): Buffer => {
    return Buffer.from(publicKey.toBuffer());
  }

  // @internal
  static createLayoutUint64 = (property: string = 'uint64') => {
    return BufferLayout.blob(8, property);
  }

  // @internal
  static createLayoutPubKey = (property: string = 'publicKey') => {
    return BufferLayout.blob(32, property);
  }
}
