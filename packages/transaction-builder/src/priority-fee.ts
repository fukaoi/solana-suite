import {
  ComputeBudgetProgram,
  ConfirmOptions,
  Keypair,
  sendAndConfirmTransaction,
  Transaction,
} from '@solana/web3.js';

import { Constants, debugLog } from '~/suite-utils';
import { Node } from '~/node';
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
      debugLog('# add lamports: ', addLamports);
      const computePriceInst = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: addLamports,
      });
      const confirmOptions: ConfirmOptions = {
        maxRetries: Constants.MAX_TRANSACTION_RETRIES,
      };
      transaction.add(computePriceInst);
      return await sendAndConfirmTransaction(
        Node.getConnection(),
        transaction,
        signers,
        confirmOptions,
      );
    };

    export const submitForPartialSign = async (
      transaction: Transaction,
      signer: Keypair,
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
      debugLog('# add lamports: ', addLamports);
      const computePriceInst = ComputeBudgetProgram.setComputeUnitPrice({
        microLamports: addLamports,
      });
      const confirmOptions: ConfirmOptions = {
        maxRetries: Constants.MAX_TRANSACTION_RETRIES,
      };
      transaction.add(computePriceInst);
      transaction.partialSign(signer);
      const wireTransaction = transaction.serialize();
      return await Node.getConnection().sendRawTransaction(
        wireTransaction,
        confirmOptions,
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
  }
}
