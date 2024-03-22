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
      const units = await simulate(instructions, payer);
      return ComputeBudgetProgram.setComputeUnitLimit({
        units,
      });
    };

    export const simulate = async (
      instructions: TransactionInstruction[],
      payer: Keypair,
    ): Promise<number> => {
      const tx = new Transaction();
      tx.recentBlockhash = PublicKey.default.toString();
      instructions.forEach((inst) => tx.add(inst));
      tx.feePayer = payer.publicKey;
      tx.verifySignatures(false);

      const simulation = await Node.getConnection().simulateTransaction(tx);

      if (simulation.value.err) {
        debugLog('# Error simulation: ', simulation);
        return 0;
      }
      const units = simulation.value.unitsConsumed || DEFAULUT_COMPUTE_UNIT;
      debugLog('# get simulate transaction: ', units);
      let cu = 0;
      if (units === 0) {
        cu = DEFAULUT_COMPUTE_UNIT;
      } else if (units < MINIMUM_COMPUTE_UNIT) {
        // only sol transfer
        cu = MINIMUM_COMPUTE_UNIT;
      } else {
        cu = Math.trunc(units * 1.1);
      }
      debugLog('# simulate cu: ', cu);
      return cu;
    };
  }
}
