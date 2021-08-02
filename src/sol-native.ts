import {
  LAMPORTS_PER_SOL,
  PublicKey,
  Signer,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {_Transaction} from './_transaction';

export namespace SolNative {
  export const transfer = async (
    sourcePubKey: PublicKey,
    signers: Array<Signer>,
    destPubKey: PublicKey,
    amount: number, // TODO: add u64 bigint
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {
    const sol = amount * LAMPORTS_PER_SOL;

    const fn = await _Transaction.send(
      sourcePubKey,
      signers,
      destPubKey,
      sol,
    );

   return instruction ? fn([instruction]) : fn();
  }
}
