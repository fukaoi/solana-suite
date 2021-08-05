import {
  LAMPORTS_PER_SOL,
  PublicKey,
  Signer,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {Transaction} from './transaction';

export namespace SolNative {
  export const transfer = async (
    sourcePubKey: PublicKey,
    signers: Signer[],
    destPubKey: PublicKey,
    amount: number, // TODO: add u64 bigint
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {
    const sol = amount * LAMPORTS_PER_SOL;

    const fn = await Transaction.send(
      sourcePubKey,
      signers,
      destPubKey,
      sol,
    );

   return instruction ? fn([instruction]) : fn();
  }
}
