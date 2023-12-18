import { TransactionInstruction } from '@solana/web3.js';
import { TransactionBuilder } from '~/transaction-builder';
import { Constants, Result, Try } from '~/shared';
import { Secret } from '~/types/account';
import { MemoOptions } from '~/types/memo';
import bs from 'bs58';
import { CommonStructure } from '~/types/transaction-builder';

export namespace Memo {
  export const decode = (encoded: string): string =>
    bs.decode(encoded).toString();

  export const encode = (data: string): Buffer => Buffer.from(data);

  /**
   * Create memo
   *
   * @param {string} data    //  memo data
   * @param {Secret} owner   //  memo owner
   * @param {Partial<DelegateOptions>} options
   * @return Promise<Result<Transaction, Error>>
   */
  export const create = (
    data: string,
    owner: Secret,
    options: Partial<MemoOptions> = {},
  ): Result<CommonStructure, Error> => {
    return Try(() => {
      const feePayer = options.feePayer;

      const key = owner.toKeypair().publicKey
        ? [
            {
              pubkey: owner.toKeypair().publicKey,
              isSigner: true,
              isWritable: true,
            },
          ]
        : [];

      const instruction = new TransactionInstruction({
        programId: Constants.MEMO_PROGRAM_ID,
        data: encode(data),
        keys: key,
      });

      const payer = feePayer || owner;

      return new TransactionBuilder.Common(
        [instruction],
        [owner.toKeypair()],
        payer.toKeypair(),
      );
    });
  };
}
