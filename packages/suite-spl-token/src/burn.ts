import {
  createBurnCheckedInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import { Pubkey, Secret } from '~/types/account';
import { Transaction } from '~/transaction';
import { Result, Try } from '~/shared';
import { SplToken as Calculate } from './calculate-amount';

export namespace SplToken {
  export const burn = (
    mint: Pubkey,
    owner: Pubkey,
    signers: Secret[],
    burnAmount: number,
    tokenDecimals: number,
    feePayer?: Secret,
  ): Result<Transaction, Error> => {
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync(
        mint.toPublicKey(),
        owner.toPublicKey(),
      );
      const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
      const keypairs = signers.map((s) => s.toKeypair());

      const inst = createBurnCheckedInstruction(
        tokenAccount,
        mint.toPublicKey(),
        owner.toPublicKey(),
        Calculate.calculateAmount(burnAmount, tokenDecimals),
        tokenDecimals,
        keypairs,
      );

      return new Transaction([inst], keypairs, payer);
    });
  };
}
