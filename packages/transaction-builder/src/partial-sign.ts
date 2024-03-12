import {
  ConfirmOptions,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';

import { Constants, Result, Try } from '~/suite-utils';
import { Node } from '~/node';
import { Pubkey } from '~/types/account';
import { TransactionBuilder as PriorityFee } from './priority-fee';
import {
  PartialSignStructure,
  SubmitOptions,
} from '~/types/transaction-builder';

export namespace TransactionBuilder {
  export class PartialSign implements PartialSignStructure {
    hexInstruction: string;
    data?: Pubkey;

    constructor(instructions: string, mint?: Pubkey) {
      this.hexInstruction = instructions;
      this.data = mint;
    }

    submit = async (
      options: Partial<SubmitOptions> = {},
    ): Promise<Result<TransactionSignature, Error>> => {
      return Try(async () => {
        if (!(this instanceof PartialSign)) {
          throw Error('only PartialSignInstruction object that can use this');
        }

        if (!options.feePayer) {
          throw Error('Need feePayer');
        }

        const decode = Buffer.from(this.hexInstruction, 'hex');
        const transaction = Transaction.from(decode);

        if (options.isPriorityFee) {
          return await PriorityFee.PriorityFee.submitForPartialSign(
            transaction,
            options.feePayer.toKeypair(),
            options.addSolPriorityFee,
          );
        } else {
          const confirmOptions: ConfirmOptions = {
            maxRetries: Constants.MAX_TRANSACTION_RETRIES,
          };
          transaction.partialSign(options.feePayer.toKeypair());
          const wireTransaction = transaction.serialize();
          return await Node.getConnection().sendRawTransaction(
            wireTransaction,
            confirmOptions,
          );
        }
      });
    };
  }
}
