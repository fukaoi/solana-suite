import { createBurnCheckedInstruction } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';
import { Instruction, Try, Result, Pubkey, Secret } from '@solana-suite/shared';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
} from '@solana/spl-token';
import { SplToken as _Calculate } from './calculate-amount';

export namespace SplToken {
  const findAssociatedTokenAddress = (
    mint: Pubkey,
    owner: Pubkey
  ): PublicKey => {
    const address = PublicKey.findProgramAddressSync(
      [
        owner.toPublicKey().toBuffer(),
        TOKEN_PROGRAM_ID.toBuffer(),
        mint.toPublicKey().toBuffer(),
      ],
      ASSOCIATED_TOKEN_PROGRAM_ID
    );
    return address[0];
  };

  export const burn = async (
    mint: Pubkey,
    owner: Pubkey,
    signers: Secret[],
    burnAmount: number,
    tokenDecimals: number,
    feePayer?: Secret
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      const tokenAccount = findAssociatedTokenAddress(mint, owner);
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
