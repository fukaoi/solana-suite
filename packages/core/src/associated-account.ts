import { PublicKey, TransactionInstruction, Keypair } from '@solana/web3.js';
import {
  Node,
  Result,
  debugLog,
  Instruction,
  sleep,
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

export namespace AssociatedAccount {
  const RETRY_OVER_LIMIT = 10;
  const RETRY_SLEEP_TIME = 3;
  export const get = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer: Keypair,
    allowOwnerOffCurve = false
  ): Promise<Result<string | Instruction, Error>> => {
    const res = await makeOrCreateInstruction(
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

  export const retryGetOrCreate = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer: Keypair
  ): Promise<Result<string, Error>> => {
    let counter = 1;
    while (counter < RETRY_OVER_LIMIT) {
      try {
        const inst = await AssociatedAccount.get(mint, owner, feePayer, true);

        if (inst.isOk && typeof inst.value === 'string') {
          debugLog('# associatedTokenAccount: ', inst.value);
          return Result.ok(inst.value);
        }

        return (await inst.submit()).map(
          (ok: string) => {
            Node.confirmedSig(ok);
            return (inst.unwrap() as Instruction).data as string;
          },
          (err: Error) => {
            debugLog('# Error submit retryGetOrCreate: ', err);
            throw err;
          }
        );
      } catch (e) {
        debugLog(`# retry: ${counter} create token account: `, e);
      }
      await sleep(RETRY_SLEEP_TIME);
      counter++;
    }
    return Result.err(Error(`retry action is over limit ${RETRY_OVER_LIMIT}`));
  };

  export const makeOrCreateInstruction = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer?: PublicKey,
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

      const payer = !feePayer ? owner : feePayer;

      const inst = createAssociatedTokenAccountInstruction(
        payer,
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
}
