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
      instructionsOrTransaction: TransactionInstruction[] | Transaction,
      payer: Keypair,
    ) => {
      let units = await simulate(instructionsOrTransaction, payer);

      if (units === 0 || !units) {
        units = DEFAULUT_COMPUTE_UNIT;
      } else if (units < MINIMUM_COMPUTE_UNIT) {
        units = MINIMUM_COMPUTE_UNIT;
      }

      debugLog('# compute units: ', units);

      return ComputeBudgetProgram.setComputeUnitLimit({
        units,
      });
    };

    export const simulate = async (
      instructionsOrTransaction: TransactionInstruction[] | Transaction,
      payer: Keypair,
    ) => {
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
      return simulation.value.unitsConsumed;
    };
  }
}
