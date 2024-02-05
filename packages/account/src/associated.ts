import { TransactionInstruction } from '@solana/web3.js';
import { debugLog } from '~/suite-utils';
import { Node } from '~/node';
import { Pubkey } from '~/types/account';

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from '@solana/spl-token';

/**
 * Get Associated token Account.
 * if not created, create new token accouint
 *
 * @param {Pubkey} mint
 * @param {Pubkey} owner
 * @param {Secret} feePayer
 * @param {boolean} allowOwnerOffCurve
 * @returns Promise<string | Instruction>
 */
export namespace Account {
  export namespace Associated {
    /**
     * [Main logic]Get Associated token Account.
     * if not created, create new token accouint
     *
     * @param {Pubkey} mint
     * @param {Pubkey} owner
     * @param {Pubkey} feePayer
     * @returns Promise<string>
     */
    export const makeOrCreateInstruction = async (
      mint: Pubkey,
      owner: Pubkey,
      feePayer?: Pubkey,
      allowOwnerOffCurve = false,
    ): Promise<{
      tokenAccount: string;
      inst: TransactionInstruction | undefined;
    }> => {
      const associatedTokenAccount = getAssociatedTokenAddressSync(
        mint.toPublicKey(),
        owner.toPublicKey(),
        allowOwnerOffCurve,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID,
      );

      debugLog('# associatedTokenAccount: ', associatedTokenAccount.toString());

      try {
        // Dont use Result
        await getAccount(
          Node.getConnection(),
          associatedTokenAccount,
          Node.getConnection().commitment,
          TOKEN_PROGRAM_ID,
        );
        return {
          tokenAccount: associatedTokenAccount.toString(),
          inst: undefined,
        };
      } catch (error: unknown) {
        if (
          !(error instanceof TokenAccountNotFoundError) &&
          !(error instanceof TokenInvalidAccountOwnerError)
        ) {
          throw Error('Unexpected error');
        }

        const payer = !feePayer ? owner : feePayer;

        const inst = createAssociatedTokenAccountInstruction(
          payer.toPublicKey(),
          associatedTokenAccount,
          owner.toPublicKey(),
          mint.toPublicKey(),
          TOKEN_PROGRAM_ID,
          ASSOCIATED_TOKEN_PROGRAM_ID,
        );

        return {
          tokenAccount: associatedTokenAccount.toString(),
          inst,
        };
      }
    };
  }
}
