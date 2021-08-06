import {
  LAMPORTS_PER_SOL,
  PublicKey,
  TransactionInstruction,
  TransactionSignature,
} from '@solana/web3.js';

import {Transaction} from './transaction';
import {Util} from './util';

export namespace SolNative {
  export const transfer = async (
    sourcePubkey: string,
    signerSecrets: string[],
    destPubkey: string,
    amount: number, // TODO: add u64 bigint
    instruction?: TransactionInstruction
  ): Promise<TransactionSignature> => {
    const sol = amount * LAMPORTS_PER_SOL;
    const sourcePublicKey = new PublicKey(sourcePubkey);
    const destPublicKey = new PublicKey(destPubkey);
    const signers = signerSecrets.map(signer => Util.createKeypair(signer));
    const fn = await Transaction.send(
      sourcePublicKey,
      signers,
      destPublicKey,
      sol,
    );

    return instruction ? fn([instruction]) : fn();
  }
}
