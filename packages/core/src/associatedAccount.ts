import { PublicKey, Keypair, ParsedInstruction } from '@solana/web3.js';
import {
  Result,
  Instruction,
  debugLog,
  Node,
  sleep,
} from '@solana-suite/shared';
import { Internals_SplToken } from './internals/_spl-token';

export namespace AssociatedAccount {
  const RETRY_OVER_LIMIT = 10;
  const RETRY_SLEEP_TIME = 3;
  export const get = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer: Keypair,
    allowOwnerOffCurve = false
  ): Promise<Result<string | Instruction, Error>> => {
    const res =
      await Internals_SplToken.getOrCreateAssociatedTokenAccountInstruction(
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
}
