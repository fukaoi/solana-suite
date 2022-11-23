import { createMintToCheckedInstruction } from '@solana/spl-token';
import { Keypair, PublicKey } from '@solana/web3.js';
import { Result, Instruction, Try } from '@solana-suite/shared';
import { AssociatedAccount } from '../associated-account';
import { SplToken as _Calculate } from './calculate-amount';

export namespace SplToken {
  export const add = async (
    token: PublicKey,
    owner: PublicKey,
    signers: Keypair[],
    totalAmount: number,
    mintDecimal: number,
    feePayer?: Keypair
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      !feePayer && (feePayer = signers[0]);

      const tokenAssociated = await AssociatedAccount.retryGetOrCreate(
        token,
        owner,
        feePayer
      );

      const inst = createMintToCheckedInstruction(
        token,
        tokenAssociated.toPublicKey(),
        owner,
        _Calculate.calculateAmount(totalAmount, mintDecimal),
        mintDecimal,
        signers
      );

      return new Instruction([inst], signers, feePayer, token.toBase58());
    });
  };
}
