import {
  TransactionSignature,
  Keypair,
  Transaction,
  ConfirmOptions,
} from '@solana/web3.js';

import { Node, Result, Try } from '../';
import { MAX_RETRIES } from './index';

export class InstructionPartialSign {
  hexInstruction: string;

  constructor(instructions: string) {
    this.hexInstruction = instructions;
  }

  submit = async (
    feePayer: Keypair
  ): Promise<Result<TransactionSignature, Error>> => {
    return Try(async () => {
      if (!(this instanceof InstructionPartialSign)) {
        throw Error('only PartialSignInstruction object that can use this');
      }

      const decode = Buffer.from(this.hexInstruction, 'hex');
      const transactionFromJson = Transaction.from(decode);
      transactionFromJson.partialSign(feePayer);

      const options: ConfirmOptions = {
        maxRetries: MAX_RETRIES,
      };
      const wireTransaction = transactionFromJson.serialize();
      return await Node.getConnection().sendRawTransaction(
        wireTransaction,
        options
      );
    });
  };
}
