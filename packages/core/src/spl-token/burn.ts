import { createBurnCheckedInstruction } from '@solana/spl-token';
import { PublicKey, Keypair } from '@solana/web3.js';
import { Instruction, Try, Result } from '@solana-suite/shared';
import { Internals_SplToken } from '../internals/_spl-token';

export namespace SplToken {
  export const burn = async (
    mint: PublicKey,
    owner: PublicKey,
    signers: Keypair[],
    burnAmount: number,
    tokenDecimals: number,
    feePayer?: Keypair
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      const tokenAccount = await Internals_SplToken.findAssociatedTokenAddress(
        mint,
        owner
      );

      const inst = createBurnCheckedInstruction(
        tokenAccount,
        mint,
        owner,
        Internals_SplToken.calculateAmount(burnAmount, tokenDecimals),
        tokenDecimals,
        signers
      );

      return new Instruction([inst], signers, feePayer);
    });
  };
}
