import {
  sendAndConfirmTransaction,
  TransactionSignature,
  Signer,
  TransactionInstruction,
  Transaction,
  ConfirmOptions,
} from '@solana/web3.js';

import {
  Node,
  Result
} from './';

const MAX_RETRIES = 3;

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
    if (!(this instanceof Instruction)) {
      return Result.err(
        Error('only Instruction object that can use this')
      );
    }
    const transaction = new Transaction();
    let finalSigners = this.signers;
    if (this.feePayer) {
      transaction.feePayer = this.feePayer.publicKey;
      finalSigners = [this.feePayer, ...this.signers];
    }

    this.instructions.map(inst => transaction.add(inst));

    const options: ConfirmOptions = {
      maxRetries: MAX_RETRIES
    }

    return await sendAndConfirmTransaction(
      Node.getConnection(),
      transaction,
      finalSigners,
      options
    )
      .then(Result.ok)
      .catch(Result.err);
  }

  // @internal
  static batchSubmit = async (
    arr: Instruction[]
  ): Promise<Result<TransactionSignature, Error>> => {
    let i = 0;
    for (const a of arr) {
      if (!a.instructions && !a.signers) {
        return Result.err(
          Error(
            `only Instruction object that can use batchSubmit().
            Index: ${i}, Set value: ${JSON.stringify(a)}`,
          )
        );
      }
      i++;
    }

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

    const options: ConfirmOptions = {
      maxRetries: MAX_RETRIES
    }

    return await sendAndConfirmTransaction(
      Node.getConnection(),
      transaction,
      finalSigners,
      options
    )
      .then(Result.ok)
      .catch(Result.err);
  }
}

export class PartialSignInstruction {
  hexInstruction: string;

  constructor(instructions: string) {
    this.hexInstruction = instructions;
  }

  submit = async (feePayer: Signer)
    : Promise<Result<TransactionSignature, Error>> => {
    if (!(this instanceof PartialSignInstruction)) {
      return Result.err(
        Error('only PartialSignInstruction object that can use this')
      );
    }

    const decode = Buffer.from(this.hexInstruction, 'hex');
    const transactionFromJson = Transaction.from(decode);
    transactionFromJson.partialSign(feePayer);

    const options: ConfirmOptions = {
      maxRetries: MAX_RETRIES
    }
    const wireTransaction = transactionFromJson.serialize();
    return await Node.getConnection().sendRawTransaction(
      wireTransaction,
      options
    )
      .then(Result.ok)
      .catch(Result.err);
  }
}
