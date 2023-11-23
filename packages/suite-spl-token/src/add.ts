import { createMintToCheckedInstruction } from '@solana/spl-token';
import { Result, Try } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { Transaction } from '~/transaction';
import { Account } from '~/account';
import { SplToken as Calculate } from './calculate-amount';
import { AuthorityOptions } from '~/types/shared';

export namespace SplToken {
  export const add = async (
    token: Pubkey,
    owner: Pubkey,
    signers: Secret[],
    totalAmount: number,
    mintDecimal: number,
    options: Partial<AuthorityOptions> = {},
  ): Promise<Result<Transaction, Error>> => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());

      const tokenAssociated = await Account.Associated.retryGetOrCreate(
        token,
        owner,
        payer,
      );

      const inst = createMintToCheckedInstruction(
        token.toPublicKey(),
        tokenAssociated.toPublicKey(),
        owner.toPublicKey(),
        Calculate.calculateAmount(totalAmount, mintDecimal),
        mintDecimal,
        keypairs,
      );

      return new Transaction([inst], keypairs, payer.toKeypair(), token);
    });
  };
}
