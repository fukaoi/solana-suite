import { PublicKey, Signer} from '@solana/web3.js';

import {
  Node,
  Result,
  Instruction,
  sleep,
  debugLog,
} from '@solana-suite/shared';

import { Account as Acc } from '../';

export namespace Internals_SplToken {
  const RETRY_OVER_LIMIT = 10;
  const RETRY_SLEEP_TIME = 3;

  export const retryGetOrCreateAssociatedAccountInfo = async (
    mint: PublicKey,
    owner: PublicKey,
    feePayer: Signer
  ): Promise<Result<string, Error>> => {
    let counter = 1;
    while (counter < RETRY_OVER_LIMIT) {
      try {
        const inst = await Acc.getOrCreateAssociatedTokenAccount(
          mint,
          owner,
          feePayer,
          true
        );

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
            debugLog('# Error submit getOrCreateAssociatedTokenAccount: ', err);
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
