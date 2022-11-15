import { createBurnCheckedInstruction } from '@solana/spl-token';
import { PublicKey, Keypair } from '@solana/web3.js';
import { Instruction, Try, Result } from '@solana-suite/shared';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { SplToken as _Calculate} from './calculate-amount';

export namespace SplToken {
  const findAssociatedTokenAddress = async (
    mint: PublicKey,
    owner: PublicKey
  ): Promise<PublicKey> => {
    const address = await PublicKey.findProgramAddress(
      [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    return address[0];
  };

  export const burn = async (
    mint: PublicKey,
    owner: PublicKey,
    signers: Keypair[],
    burnAmount: number,
    tokenDecimals: number,
    feePayer?: Keypair
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      const tokenAccount = await findAssociatedTokenAddress(
        mint,
        owner
      );

      const inst = createBurnCheckedInstruction(
        tokenAccount,
        mint,
        owner,
        _Calculate.calculateAmount(burnAmount, tokenDecimals),
        tokenDecimals,
        signers
      );

      return new Instruction([inst], signers, feePayer);
    });
  };
}
