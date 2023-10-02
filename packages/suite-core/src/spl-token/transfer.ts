import { createTransferCheckedInstruction } from '@solana/spl-token';
import { Result, Try } from '~/shared';
import { SplToken as _Calculator } from './calculate-amount';
import { AssociatedAccount } from '~/account';
import { Instruction } from '~/instruction';
import { Pubkey, Secret } from '~/types/account';

export namespace SplToken {
  export const transfer = async (
    mint: Pubkey,
    owner: Pubkey,
    dest: Pubkey,
    signers: Secret[],
    amount: number,
    mintDecimal: number,
    feePayer?: Secret,
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      const payer = feePayer ? feePayer : signers[0];
      const keypairs = signers.map((s) => s.toKeypair());

      const sourceToken = await AssociatedAccount.retryGetOrCreate(
        mint,
        owner,
        payer,
      );

      const destToken = await AssociatedAccount.retryGetOrCreate(
        mint,
        dest,
        payer,
      );

      const inst = createTransferCheckedInstruction(
        sourceToken.toPublicKey(),
        mint.toPublicKey(),
        destToken.toPublicKey(),
        owner.toPublicKey(),
        _Calculator.calculateAmount(amount, mintDecimal),
        mintDecimal,
        keypairs,
      );

      return new Instruction([inst], keypairs, payer.toKeypair());
    });
  };
}
