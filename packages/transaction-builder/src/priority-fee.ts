import {
  ComputeBudgetProgram,
  ConfirmOptions,
  Keypair,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js';

import { debugLog } from '~/suite-utils';
import { Node } from '~/node';
import { MAX_RETRIES } from './common';
import { DasApi } from '~/das-api';

export namespace TransactionBuilder {
  export namespace PriorityFee {
    const MINIMUM_PRIORITY_FEE = 300;
    export const submit = async (
      transaction: Transaction,
      signers: Keypair[],
      addSolPriorityFee?: number,
    ) => {
      let addLamports = 0;
      if (addSolPriorityFee) {
        addLamports = addSolPriorityFee.toLamports();
      } else {
        const estimates = await DasApi.getPriorityFeeEstimate(transaction);
        debugLog('# estimates: ', estimates);
        addLamports =
          estimates.isOk && estimates.unwrap().medium !== 0
            ? estimates.unwrap().medium
            : MINIMUM_PRIORITY_FEE;
      }
      debugLog('# lamports: ', addLamports);
      return await sendTransactionWithPriorityFee(
        addLamports,
        transaction,
        signers,
      );
    };

    export const createPriorityFeeInstruction = async (
      transaction: Transaction,
    ) => {
      const estimates = await DasApi.getPriorityFeeEstimate(transaction);
      debugLog('# estimates: ', estimates);
      // priority fee: medium
      const lamports = estimates.isOk
        ? estimates.unwrap().medium
        : MINIMUM_PRIORITY_FEE;
      return ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: lamports,
      });
    };

    const sendTransactionWithPriorityFee = async (
      lamports: number,
      transaction: Transaction,
      finalSigners: Keypair[],
    ) => {
      const computePriceInst = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: lamports,
      });
      const confirmOptions: ConfirmOptions = {
        maxRetries: MAX_RETRIES,
      };
      transaction.add(computePriceInst);
      return await sendAndConfirmTransaction(
        Node.getConnection(),
        transaction,
        finalSigners,
        confirmOptions,
      );
    };
  }
}
