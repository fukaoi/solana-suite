import {
  TransactionSignature,
  Transaction,
  ConfirmOptions,
} from '@solana/web3.js';

import { Node } from './node';
import { Result } from './result';
import { Try } from './global';
import { MAX_RETRIES } from './instruction/define';
import { Secret } from './types';

export class PartialSignInstruction {
  hexInstruction: string;

  constructor(instructions: string) {
    this.hexInstruction = instructions;
  }

  submit = async (
    feePayer: Secret
  ): Promise<Result<TransactionSignature, Error>> => {
    return Try(async () => {
      if (!(this instanceof PartialSignInstruction)) {
        throw Error('only PartialSignInstruction object that can use this');
      }

      const decode = Buffer.from(this.hexInstruction, 'hex');
      const transactionFromJson = Transaction.from(decode);
      transactionFromJson.partialSign(feePayer.toKeypair());

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
