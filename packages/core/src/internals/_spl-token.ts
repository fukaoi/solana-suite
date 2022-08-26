import { PublicKey, Signer, TransactionInstruction } from '@solana/web3.js';

import {
  Node,
  Result,
  Instruction,
  debugLog,
} from '@solana-suite/shared';

import {
  ASSOCIATED_TOKEN_PROGRAM_ID,
  TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
  getAccount,
  TokenAccountNotFoundError,
  TokenInvalidAccountOwnerError,
  createAssociatedTokenAccountInstruction,
} from '@solana/spl-token';

export namespace Internals_SplToken {
  export const findAssociatedTokenAddress = async (
    mint: PublicKey,
    owner: PublicKey
  ): Promise<Result<PublicKey, Error>> => {
    return await PublicKey.findProgramAddress(
      [owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
      .then((v) => Result.ok(v[0]))
      .catch(Result.err);
  };

  export const getOrCreateAssociatedTokenAccountInstruction = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer: PublicKey,
    allowOwnerOffCurve = false
  ): Promise<
    Result<
      { tokenAccount: string; inst: TransactionInstruction | undefined },
      Error
    >
  > => {
    const associatedToken = await getAssociatedTokenAddress(
      mint,
      owner,
      allowOwnerOffCurve,
      TOKEN_PROGRAM_ID,
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
      .then(Result.ok)
      .catch(Result.err);

    if (associatedToken.isErr) {
      return associatedToken.error;
    }

    const associatedTokenAccount = associatedToken.unwrap();
    debugLog('# associatedTokenAccount: ', associatedTokenAccount.toString());

    try {
      // Dont use Result
      await getAccount(
        Node.getConnection(),
        associatedTokenAccount,
        Node.getConnection().commitment,
        TOKEN_PROGRAM_ID
      );
      return Result.ok({
        tokenAccount: associatedTokenAccount.toString(),
        inst: undefined,
      });
    } catch (error: unknown) {
      if (
        !(error instanceof TokenAccountNotFoundError) &&
        !(error instanceof TokenInvalidAccountOwnerError)
      ) {
        return Result.err(Error('Unexpected error'));
      }

      const inst = createAssociatedTokenAccountInstruction(
        feePayer,
        associatedTokenAccount,
        owner,
        mint,
        TOKEN_PROGRAM_ID,
        ASSOCIATED_TOKEN_PROGRAM_ID
      );

      return Result.ok({
        tokenAccount: associatedTokenAccount.toString(),
        inst,
      });
    }
  };

  export const getOrCreateAssociatedTokenAccount = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer: Signer,
    allowOwnerOffCurve = false
  ): Promise<Result<string | Instruction, Error>> => {
    const res = await getOrCreateAssociatedTokenAccountInstruction(
      mint,
      owner,
      feePayer.publicKey,
      allowOwnerOffCurve
    );

    if (res.isErr) {
      return Result.err(res.error);
    }

    if (!res.value.inst) {
      return Result.ok(res.value.tokenAccount);
    }

    return Result.ok(
      new Instruction([res.value.inst], [], feePayer, res.value.tokenAccount)
    );
  };
}
