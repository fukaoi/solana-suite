import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';

import {Transaction, Result} from './';

export namespace SolNative {
  export const transfer = (
    source: PublicKey,
    destination: PublicKey,
    signers: Keypair[],
    amount: number,
  ) => async (append?: Transaction.AppendValue)
      : Promise<Result<string, Error>> => {
      const sol = amount * LAMPORTS_PER_SOL;
      return Transaction.send(
        source,
        destination,
        signers,
        sol,
      )(append);
    }
}
