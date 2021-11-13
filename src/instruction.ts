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
import BN from 'bn.js';
import assert from 'assert';


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

export class u64 extends BN {
  /**
   * Convert to Buffer representation
   */
  toBuffer(): Buffer {
    const a = super.toArray().reverse();
    const b = Buffer.from(a);
    if (b.length === 8) {
      return b;
    }

    if (b.length < 8) {
      assert(Error('u64 too large'));
    }

    const zeroPad = Buffer.alloc(8);
    b.copy(zeroPad);
    return zeroPad;
  }

  /**
   * Construct a u64 from Buffer representation
   */
  static fromBuffer(buffer: Buffer): u64 {
    if (buffer.length === 8) {
      assert(Error(`Invalid buffer length: ${buffer.length}`));
    }
    return new u64(
      [...buffer]
        .reverse()
        .map(i => `00${i.toString(16)}`.slice(-2))
        .join(''),
      16,
    );
  }
}
