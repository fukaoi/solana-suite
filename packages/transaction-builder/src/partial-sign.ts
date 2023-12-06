import {
  ConfirmOptions,
  Transaction as Tx,
  TransactionSignature,
} from '@solana/web3.js';

import { Result, Try } from '~/shared';
import { Node } from '~/node';
import { Pubkey, Secret } from '~/types/account';
import { MAX_RETRIES } from './common';
import { PartialSignStructure } from '~/types/transaction-builder';

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
      feePayer: Secret,
    ): Promise<Result<TransactionSignature, Error>> => {
      return Try(async () => {
        if (!(this instanceof PartialSign)) {
          throw Error('only PartialSignInstruction object that can use this');
        }

        const decode = Buffer.from(this.hexInstruction, 'hex');
        const transactionFromJson = Tx.from(decode);
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
}
