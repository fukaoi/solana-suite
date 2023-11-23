import {
  createBurnCheckedInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import { Pubkey, Secret } from '~/types/account';
import { Transaction } from '~/transaction';
import { Result, Try } from '~/shared';
import { SplToken as Calculate } from './calculate-amount';
import { AuthorityOptions } from '~/types/shared';

export namespace SplToken {
  export const burn = (
    mint: Pubkey,
    owner: Pubkey,
    signers: Secret[],
    burnAmount: number,
    tokenDecimals: number,
    options: Partial<AuthorityOptions> = {},
  ): Result<Transaction, Error> => {
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync(
        mint.toPublicKey(),
        owner.toPublicKey(),
      );
      const payer = options.feePayer ? options.feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());

      const inst = createBurnCheckedInstruction(
        tokenAccount,
        mint.toPublicKey(),
        owner.toPublicKey(),
        Calculate.calculateAmount(burnAmount, tokenDecimals),
        tokenDecimals,
        keypairs,
      );

      return new Transaction([inst], keypairs, payer.toKeypair());
    });
  };
}
