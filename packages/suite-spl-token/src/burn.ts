import {
  createBurnCheckedInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import { Pubkey, Secret } from '~/types/account';
import { TransactionBuilder } from '~/transaction-builder';
import { Result, Try } from '~/shared';
import { SplToken as Calculate } from './calculate-amount';
import { BurnOptions } from '~/types/spl-token';
import { CommonStructure } from '~/types/transaction-builder';

export namespace SplToken {
  export const burn = (
    mint: Pubkey,
    owner: Pubkey,
    signers: Secret[],
    burnAmount: number,
    tokenDecimals: number,
    options: Partial<BurnOptions> = {},
  ): Result<CommonStructure, Error> => {
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

      return new TransactionBuilder.Common([inst], keypairs, payer.toKeypair());
    });
  };
}
