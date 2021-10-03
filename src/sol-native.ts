import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {Transaction} from './transaction';

export namespace SolNative {
  export const transfer = (
    source: PublicKey,
    signers: Keypair[],
    destination: PublicKey,
    amount: number, // TODO: add u64 bigint
  ) => async (instruction?: TransactionInstruction):
      Promise<TransactionSignature> => {
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
