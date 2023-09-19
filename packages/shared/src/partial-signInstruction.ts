import {
  ConfirmOptions,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';

import { Node, Pubkey, Result, Secret, Try } from '~/index';
import { MAX_RETRIES } from '~/instruction/define';

export class PartialSignInstruction {
  hexInstruction: string;
  data?: Pubkey;

  constructor(instructions: string, mint?: Pubkey) {
    this.hexInstruction = instructions;
    this.data = mint;
  }

  submit = async (
    feePayer: Secret,
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
        options,
      );
    });
  };
}
