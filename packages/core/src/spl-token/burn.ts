import { createBurnCheckedInstruction } from '@solana/spl-token';
import { PublicKey, Keypair } from '@solana/web3.js';
import { Result, Instruction } from '@solana-suite/shared';
import { Internals_SplToken } from '../internals/_spl-token';

export namespace SplToken {
  export const burn = async (
    mint: PublicKey,
    owner: PublicKey,
    signers: Keypair[],
    burnAmount: number,
    tokenDecimals: number,
    feePayer?: Keypair
  ) => {
    const tokenAccount = await Internals_SplToken.findAssociatedTokenAddress(
      mint,
      owner
    );

    if (tokenAccount.isErr) {
      return Result.err(tokenAccount.error);
    }

    const inst = createBurnCheckedInstruction(
      tokenAccount.unwrap(),
      mint,
      owner,
      Internals_SplToken.calculateAmount(burnAmount, tokenDecimals),
      tokenDecimals,
      signers
    );

    return Result.ok(new Instruction([inst], signers, feePayer));
  };
}
