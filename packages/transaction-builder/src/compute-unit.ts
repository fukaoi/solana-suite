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
      instructions: TransactionInstruction[],
      payer: Keypair,
    ) => {
      const tx = new Transaction();
      tx.recentBlockhash = PublicKey.default.toString();
      instructions.forEach((inst) => tx.add(inst));
      tx.feePayer = payer.publicKey;
      tx.verifySignatures(false);
      const simulation = await Node.getConnection().simulateTransaction(tx);

      if (simulation.value.err) {
        debugLog('# Error simulation: ', simulation);
        return undefined;
      }
      return simulation.value.unitsConsumed;
    };
  }
}
