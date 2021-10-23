import {
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';

import {Transaction, Result} from './';

export namespace SolNative {
  export const transfer = (
    source: PublicKey,
    destination: PublicKey,
    amount: number,
  ) => async (append: Transaction.AppendValue)
      : Promise<Result<string, Error>> => {
      const sol = amount * LAMPORTS_PER_SOL;
      return Transaction.send(
        source,
        destination,
        sol,
      )(
        {
          signers: append.signers,
          feePayer: append.feePayer,
          txInstructions: append.txInstructions
        }
      );
    }
}
