import {
  ConfirmOptions,
  Transaction,
  TransactionSignature,
} from '@solana/web3.js';

import { Result, Try } from '~/suite-utils';
import { Node } from '~/node';
import { Pubkey } from '~/types/account';
import { MAX_RETRIES } from './common';
import {
  PartialSignStructure,
  PartialSignSubmitOptions,
} from '~/types/transaction-builder';

export namespace TransactionBuilder {
  export class PartialSign implements PartialSignStructure {
    hexInstruction: string;
    data?: Pubkey;
    canSubmit?: boolean;

    constructor(instructions: string, mint?: Pubkey, canSubmit = false) {
      this.hexInstruction = instructions;
      this.data = mint;
      this.canSubmit = canSubmit;
    }

    submit = async (
      options: Partial<PartialSignSubmitOptions> = {},
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
        transaction.partialSign(options.feePayer!.toKeypair());

        const confirmOptions: ConfirmOptions = {
          maxRetries: MAX_RETRIES,
        };
        const wireTransaction = transaction.serialize();
        return await Node.getConnection().sendRawTransaction(
          wireTransaction,
          confirmOptions,
        );
      });
    };
  }
}
