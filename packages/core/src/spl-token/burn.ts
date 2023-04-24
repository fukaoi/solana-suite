import {
  createBurnCheckedInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import { Instruction, Pubkey, Result, Secret, Try } from '@solana-suite/shared';
import { SplToken as _Calculate } from './calculate-amount';

export namespace SplToken {
  export const burn = (
    mint: Pubkey,
    owner: Pubkey,
    signers: Secret[],
    burnAmount: number,
    tokenDecimals: number,
    feePayer?: Secret
  ): Result<Instruction, Error> => {
    return Try(() => {
      const tokenAccount = getAssociatedTokenAddressSync(
        mint.toPublicKey(),
        owner.toPublicKey()
      );
      const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
      const keypairs = signers.map((s) => s.toKeypair());

      const inst = createBurnCheckedInstruction(
        tokenAccount,
        mint.toPublicKey(),
        owner.toPublicKey(),
        _Calculate.calculateAmount(burnAmount, tokenDecimals),
        tokenDecimals,
        keypairs
      );

      return new Instruction([inst], keypairs, payer);
    });
  };
}
