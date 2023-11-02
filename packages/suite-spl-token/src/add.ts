import { createMintToCheckedInstruction } from '@solana/spl-token';
import { Result, Try } from '~/shared';
import { Pubkey, Secret } from '~/types/account';
import { Transaction } from '~/transaction';
import { Account } from '~/account';
import { SplToken as _Calculate } from './calculate-amount';

export namespace SplToken {
  export const add = async (
    token: Pubkey,
    owner: Pubkey,
    signers: Secret[],
    totalAmount: number,
    mintDecimal: number,
    feePayer?: Secret,
  ): Promise<Result<Transaction, Error>> => {
    return Try(async () => {
      const payer = !feePayer ? signers[0] : feePayer;
      const keypairs = signers.map((s) => s.toKeypair());

      const tokenAssociated = await Account.Associated.retryGetOrCreate(
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

      return new Transaction([inst], keypairs, payer.toKeypair(), token);
    });
  };
}
