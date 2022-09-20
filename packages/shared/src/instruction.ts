import {
  sendAndConfirmTransaction,
  TransactionSignature,
  Keypair,
  TransactionInstruction,
  Transaction,
  ConfirmOptions,
} from '@solana/web3.js';

import { Node, Result } from './';

export const MAX_RETRIES = 3;

export class Instruction {
  instructions: TransactionInstruction[];
  signers: Keypair[];
  feePayer?: Keypair;
  data?: unknown;

  constructor(
    instructions: TransactionInstruction[],
    signers: Keypair[],
    feePayer?: Keypair,
    data?: unknown
  ) {
    this.instructions = instructions;
    this.signers = signers;
    this.feePayer = feePayer;
    this.data = data;
  }

  submit = async (): Promise<Result<TransactionSignature, Error>> => {
    if (!(this instanceof Instruction)) {
      return Result.err(Error('only Instruction object that can use this'));
    }
    const transaction = new Transaction();
    let finalSigners = this.signers;
    if (this.feePayer) {
      transaction.feePayer = this.feePayer.publicKey;
      finalSigners = [this.feePayer, ...this.signers];
    }

    this.instructions.forEach(inst => transaction.add(inst));

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

export class PartialSignInstruction {
  hexInstruction: string;

  constructor(instructions: string) {
    this.hexInstruction = instructions;
  }

  submit = async (
    feePayer: Keypair
  ): Promise<Result<TransactionSignature, Error>> => {
    if (!(this instanceof PartialSignInstruction)) {
      return Result.err(
        Error('only PartialSignInstruction object that can use this')
      );
    }

    const decode = Buffer.from(this.hexInstruction, 'hex');
    const transactionFromJson = Transaction.from(decode);
    transactionFromJson.partialSign(feePayer);

    const options: ConfirmOptions = {
      maxRetries: MAX_RETRIES,
    };
    const wireTransaction = transactionFromJson.serialize();
    return await Node.getConnection()
      .sendRawTransaction(wireTransaction, options)
      .then(Result.ok)
      .catch(Result.err);
  };
}
