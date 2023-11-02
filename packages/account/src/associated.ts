import { TransactionInstruction } from '@solana/web3.js';
import { debugLog, sleep } from '~/shared';
import { Node } from '~/node';
import { Transaction } from '~/transaction';
import { Pubkey, Secret } from '~/types/account';

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  createAssociatedTokenAccountInstruction,
  getAccount,
  getAssociatedTokenAddressSync,
  TOKEN_PROGRAM_ID,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
} from '@solana/spl-token';

import { Account as Keypair } from './keypair';

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
    const RETRY_OVER_LIMIT = 10;
    const RETRY_SLEEP_TIME = 3;
    //@internal
    const get = async (
      mint: Pubkey,
      owner: Pubkey,
      feePayer: Secret,
      allowOwnerOffCurve = false,
    ): Promise<string | Transaction> => {
      const res = await makeOrCreateInstruction(
        mint,
        owner,
        new Keypair.Keypair({ secret: feePayer }).pubkey,
        allowOwnerOffCurve,
      );

      if (!res.inst) {
        return res.tokenAccount;
      }

      return new Transaction(
        [res.inst],
        [],
        feePayer.toKeypair(),
        res.tokenAccount,
      );
    };

    /**
     * Retry function if create new token accouint
     *
     * @param {Pubkey} mint
     * @param {Pubkey} owner
     * @param {Secret} feePayer
     * @returns Promise<string>
     */
    export const retryGetOrCreate = async (
      mint: Pubkey,
      owner: Pubkey,
      feePayer: Secret,
    ): Promise<string> => {
      let counter = 1;
      while (counter < RETRY_OVER_LIMIT) {
        try {
          const inst = await get(mint, owner, feePayer, true);

          if (inst && typeof inst === 'string') {
            debugLog('# associatedTokenAccount: ', inst);
            return inst;
          } else if (inst instanceof Transaction) {
            (await inst.submit()).map(
              async (ok) => {
                await Node.confirmedSig(ok);
                return inst.data as string;
              },
              (err) => {
                debugLog('# Error submit retryGetOrCreate: ', err);
                throw err;
              },
            );
          }
        } catch (e) {
          debugLog(`# retry: ${counter} create token account: `, e);
          debugLog(`# mint: ${mint}, owner: ${owner}, feePayer: ${feePayer}`);
        }
        await sleep(RETRY_SLEEP_TIME);
        counter++;
      }
      throw Error(`retry action is over limit ${RETRY_OVER_LIMIT}`);
    };

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
