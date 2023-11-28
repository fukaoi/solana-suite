import {
  ConfirmOptions,
  Transaction as Tx,
  TransactionSignature,
} from '@solana/web3.js';

import { Result, Try } from '~/shared';
import { Node } from '~/node';
import { Pubkey, Secret } from '~/types/account';
import { MAX_RETRIES } from './define';

export class PartialSignTransaction {
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
      if (!(this instanceof PartialSignTransaction)) {
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

/**
 * senTransaction() TransactionInstruction
 *
 * @see {@link types/global.ts}
 * @returns Promise<Result<string, Error>>
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */
/* @ts-ignore */
Array.prototype.submit = async function (feePayer: Secret) {
  return Try(async () => {
    let i = 0;
    for await (const obj of this) {
      if (obj.isErr) {
        const errorMess: string = obj.error.message as string;
        throw Error(`[Array index of caught 'Result.err': ${i}]${errorMess}`);
      } else if (this.length - 1 > i) {
        // Except for the last transaction
        console.log('Except for the last transaction');
        await obj.submit(feePayer);
      } else {
        // only last transaction
        console.log('last transaction');
        return await obj.submit(feePayer);
      }
      i++;
    }
  });
};
