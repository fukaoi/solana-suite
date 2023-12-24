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
  /**
   * Burn existing token
   *
   * @param {Pubkey}    mint
   * @param {Pubkey}    owner
   * @param {Secret[]}  ownerOrMultisig
   * @param {number}    burnAmount
   * @param {number}    tokenDecimals
   * @param {Partial<BurnOptions>} options
   * @return Result<CommonStructure, Error>>
   */
  export const burn = (
    mint: Pubkey,
    owner: Pubkey,
    ownerOrMultisig: Secret[],
    burnAmount: number,
    tokenDecimals: number,
    options: Partial<BurnOptions> = {},
  ): Result<CommonStructure, Error> => {
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync(
        mint.toPublicKey(),
        owner.toPublicKey(),
      );
      const payer = options.feePayer ? options.feePayer : ownerOrMultisig[0];
      const keypairs = ownerOrMultisig.map((s) => s.toKeypair());

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
