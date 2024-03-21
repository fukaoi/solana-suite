import {
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { Node } from '~/node';
import { debugLog } from '../../suite-utils/src/shared';

export namespace TransactionBuilder {
  export namespace ComputeUnit {
    export const simulate = async (
      instructionsOrTransaction: TransactionInstruction[] | Transaction,
      payer: Keypair,
    ) => {
      let tx: Transaction;
      if (
        instructionsOrTransaction instanceof TransactionInstruction &&
        Array.isArray(instructionsOrTransaction)
      ) {
        tx = new Transaction();
        tx.recentBlockhash = PublicKey.default.toString();
        instructionsOrTransaction.forEach((inst) => tx.add(inst));
        tx.feePayer = payer.publicKey;
        tx.verifySignatures(false);
      } else {
        tx = instructionsOrTransaction as Transaction;
      }

      const simulation = await Node.getConnection().simulateTransaction(tx);

      if (simulation.value.err) {
        debugLog('# Error simulation: ', simulation);
        return undefined;
      }
      return simulation.value.unitsConsumed;
    };
  }
}
