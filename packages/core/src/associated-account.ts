import { PublicKey, TransactionInstruction, Keypair } from '@solana/web3.js';
import { Node, debugLog, Instruction, sleep } from '@solana-suite/shared';
import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';

/**
 * Get Associated token Account.
 * if not created, create new token accouint
 *
 * @param {PublicKey} mint
 * @param {PublicKey} owner
 * @param {PublicKey} feePayer
 * @param {boolean} allowOwnerOffCurve
 * @returns Promise<string | Instruction>
 */
export namespace AssociatedAccount {
  const RETRY_OVER_LIMIT = 10;
  const RETRY_SLEEP_TIME = 3;
  const get = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer: Keypair,
    allowOwnerOffCurve = false
  ): Promise<string | Instruction> => {
    const res = await makeOrCreateInstruction(
      mint,
      owner,
      feePayer.publicKey,
      allowOwnerOffCurve
    );

    if (!res.inst) {
      return res.tokenAccount;
    }

    return new Instruction([res.inst], [], feePayer, res.tokenAccount);
  };

  /**
   * Retry function if create new token accouint
   *
   * @param {PublicKey} mint
   * @param {PublicKey} owner
   * @param {PublicKey} feePayer
   * @returns Promise<string>
   */
  export const retryGetOrCreate = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer: Keypair
  ): Promise<string> => {
    let counter = 1;
    while (counter < RETRY_OVER_LIMIT) {
      try {
        const inst = await get(mint, owner, feePayer, true);

        if (inst && typeof inst === 'string') {
          debugLog('# associatedTokenAccount: ', inst);
          return inst;
        } else if (inst instanceof Instruction) {
          (await [inst].submit()).map(
            async (ok) => {
              await Node.confirmedSig(ok);
              return inst.data as string;
            },
            (err) => {
              debugLog('# Error submit retryGetOrCreate: ', err);
              throw err;
            }
          );
        }
      } catch (e) {
        debugLog(`# retry: ${counter} create token account: `, e);
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
   * @param {PublicKey} mint
   * @param {PublicKey} owner
   * @param {PublicKey} feePayer
   * @returns Promise<string>
   */
  export const makeOrCreateInstruction = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer?: PublicKey,
    allowOwnerOffCurve = false
  ): Promise<{
    tokenAccount: string;
    inst: TransactionInstruction | undefined;
  }> => {
    const associatedTokenAccount = await getAssociatedTokenAddress(
      mint,
      owner,
      allowOwnerOffCurve,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    );

    debugLog('# associatedTokenAccount: ', associatedTokenAccount.toString());

    try {
      // Dont use Result
      await getAccount(
        Node.getConnection(),
        associatedTokenAccount,
        Node.getConnection().commitment,
        TOKEN_PROGRAM_ID
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
        payer,
        associatedTokenAccount,
        owner,
        mint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      return {
        tokenAccount: associatedTokenAccount.toString(),
        inst,
      };
    }
  };
}
