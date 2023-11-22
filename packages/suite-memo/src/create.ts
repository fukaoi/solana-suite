import { TransactionInstruction } from '@solana/web3.js';
import { Transaction } from '~/transaction';
import { Constants, Result, Try } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import bs from 'bs58';
import { AuthorityOptions } from '~/types/shared';

export namespace Memo {
  export const decode = (encoded: string): string =>
    bs.decode(encoded).toString();

  export const encode = (data: string): Buffer => Buffer.from(data);

  export const create = (
    data: string,
    owner: Pubkey,
    signer: Secret,
    options: Partial<AuthorityOptions> = {},
  ): Result<Transaction, Error> => {
    return Try(() => {
      const feePayer = options.feePayer;

      const key = owner.toPublicKey()
        ? [
            {
              pubkey: owner.toPublicKey(),
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

      const payer = feePayer || signer;

      return new Transaction(
        [instruction],
        [signer.toKeypair()],
        payer.toKeypair(),
      );
    });
  };
}
