import {
  ComputeBudgetProgram,
  Keypair,
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { Node } from '~/node';
import { debugLog } from '../../suite-utils/src/shared';

export namespace TransactionBuilder {
  const DEFAULUT_COMPUTE_UNIT = 200_000;
  const MINIMUM_COMPUTE_UNIT = 450;
  export namespace ComputeUnit {
    export const createInstruction = async (
      instructions: TransactionInstruction[],
      payer: Keypair,
    ) => {
      let units = await simulate(instructions, payer);

      if (units === 0) {
        units = DEFAULUT_COMPUTE_UNIT;
      } else if (units < MINIMUM_COMPUTE_UNIT) {
        // only sol transfer
        units = MINIMUM_COMPUTE_UNIT;
      } else {
        units *= 1.1;
      }

      debugLog('# compute units: ', units);

      return ComputeBudgetProgram.setComputeUnitLimit({
        units,
      });
    };

    export const simulate = async (
      instructionsOrTransaction: TransactionInstruction[] | Transaction,
      payer: Keypair,
    ): Promise<number> => {
      let tx: Transaction;
      if (instructionsOrTransaction instanceof Transaction) {
        tx = instructionsOrTransaction;
      } else {
        tx = new Transaction();
        tx.recentBlockhash = PublicKey.default.toString();
        instructionsOrTransaction.forEach((inst) => tx.add(inst));
        tx.feePayer = payer.publicKey;
        tx.verifySignatures(false);
      }

      const simulation = await Node.getConnection().simulateTransaction(tx);

      if (simulation.value.err) {
        debugLog('# Error simulation: ', simulation);
        return 0;
      }
      return simulation.value.unitsConsumed || DEFAULUT_COMPUTE_UNIT;
    };
  }
}
