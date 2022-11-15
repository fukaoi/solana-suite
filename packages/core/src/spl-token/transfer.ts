import { createTransferCheckedInstruction } from '@solana/spl-token';
import { PublicKey, Keypair } from '@solana/web3.js';

import {
  Result,
  Instruction,
  Try,
} from '@solana-suite/shared';

import { SplToken as _Calculator } from './calculate-amount';
import { AssociatedAccount } from '../associated-account';

export namespace SplToken {
  export const transfer = async (
    mint: PublicKey,
    owner: PublicKey,
    dest: PublicKey,
    signers: Keypair[],
    amount: number,
    mintDecimal: number,
    feePayer?: Keypair
  ): Promise<Result<Instruction, Error>> => {
    return Try(async () => {
      !feePayer && (feePayer = signers[0]);

      const sourceToken = await AssociatedAccount.retryGetOrCreate(
        mint,
        owner,
        feePayer
      );

      const destToken = await AssociatedAccount.retryGetOrCreate(
        mint,
        dest,
        feePayer
      );

      const inst = createTransferCheckedInstruction(
        sourceToken.toPublicKey(),
        mint,
        destToken.toPublicKey(),
        owner,
        _Calculator.calculateAmount(amount, mintDecimal),
        mintDecimal,
        signers
      );

      return new Instruction([inst], signers, feePayer);
    });
  };
}
