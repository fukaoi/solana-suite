import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
} from '@solana/web3.js';

import {Transaction, Result} from './';

export namespace SolNative {
  export const transfer = (
    source: PublicKey,
    signers: Keypair[],
    destination: PublicKey,
    amount: number,
  ) => async (instruction?: TransactionInstruction):
      Promise<Result<string, Error>> => {
      const sol = amount * LAMPORTS_PER_SOL;
      const fn = Transaction.send(
        source,
        signers,
        destination,
        sol,
      );
      return instruction ? await fn([instruction]) : await fn();
    }
}
