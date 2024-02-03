import { createMintToCheckedInstruction } from '@solana/spl-token';
import { Result, Try } from '~/suite-utils';
import { Pubkey, Secret } from '~/types/account';
import { TransactionBuilder } from '~/transaction-builder';
import { Account } from '~/account';
import { SplToken as Calculate } from './calculate-amount';
import { MintOptions } from '~/types/spl-token';
import { CommonStructure } from '~/types/transaction-builder';

export namespace SplToken {
  /**
   * Adding new token to existing token
   *
   * @param {Pubkey}  token
   * @param {Pubkey}  owner
   * @param {Secret[]}  ownerOrMultisig
   * @param {number}  totalAmount
   * @param {number}  mintDecimal
   * @param {Partial<MintOptions>} options
   * @return Promise<Result<string, Error>>
   */
  export const add = async (
    token: Pubkey,
    owner: Pubkey,
    ownerOrMultisig: Secret[],
    totalAmount: number,
    mintDecimal: number,
    options: Partial<MintOptions> = {},
  ): Promise<Result<CommonStructure<Pubkey>, Error>> => {
    return Try(async () => {
      const payer = options.feePayer ? options.feePayer : ownerOrMultisig[0];
      const keypairs = ownerOrMultisig.map((s) => s.toKeypair());

      const tokenAssociated = await Account.Associated.retryGetOrCreate(
        token,
        owner,
        payer,
      );

      const inst = createMintToCheckedInstruction(
        token.toPublicKey(),
        tokenAssociated.toPublicKey(),
        owner.toPublicKey(),
        Calculate.calculateAmount(totalAmount, mintDecimal),
        mintDecimal,
        keypairs,
      );

      return new TransactionBuilder.Common<Pubkey>(
        [inst],
        keypairs,
        payer.toKeypair(),
        token,
      );
    });
  };
}
