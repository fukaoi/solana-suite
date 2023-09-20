import { createMintToCheckedInstruction } from '@solana/spl-token';
import { Result, Instruction, Try, Pubkey, Secret } from '@solana-suite/shared';
import { AssociatedAccount } from '../associated-account';
import { SplToken as _Calculate } from './calculate-amount';

export namespace SplToken {
  export const add = async (
    token: Pubkey,
    owner: Pubkey,
    signers: Secret[],
    totalAmount: number,
    mintDecimal: number,
    feePayer?: Secret,
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      const payer = !feePayer ? signers[0] : feePayer;
      const keypairs = signers.map((s) => s.toKeypair());

      const tokenAssociated = await AssociatedAccount.retryGetOrCreate(
        token,
        owner,
        payer,
      );

      const inst = createMintToCheckedInstruction(
        token.toPublicKey(),
        tokenAssociated.toPublicKey(),
        owner.toPublicKey(),
        _Calculate.calculateAmount(totalAmount, mintDecimal),
        mintDecimal,
        keypairs,
      );

      return new Instruction([inst], keypairs, payer.toKeypair(), token);
    });
  };
}
