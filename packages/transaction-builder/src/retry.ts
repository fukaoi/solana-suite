import {
  ConfirmOptions,
  Keypair,
  sendAndConfirmTransaction,
  SendTransactionError,
  Transaction,
} from '@solana/web3.js';
import { Node } from '~/node';
import { debugLog } from '~/suite-utils';
import { TransactionBuilder as ComputeUnit } from './compute-unit';

export namespace TransactionBuilder {
  export namespace Retry {
    const RETRY_MULTIPLIED = 1.6;
    export const isComputeBudgetError = (
      error: unknown,
    ): error is SendTransactionError => {
      if (typeof error === 'object' && error instanceof SendTransactionError) {
        if (error.logs?.some((item) => item.includes('ComputeBudget'))) {
          return true;
        }
      }
      return false;
    };

    export const submit = async (
      transaction: Transaction,
      finalSigners: Keypair[],
      confirmOptions: ConfirmOptions,
    ) => {
      debugLog('# Retry the Transaction due to a compute budget error');
      transaction.instructions[0] =
        await ComputeUnit.ComputeUnit.createInstruction(
          transaction.instructions,
          finalSigners[0],
          RETRY_MULTIPLIED,
        );

      const res = await sendAndConfirmTransaction(
        Node.getConnection(),
        transaction,
        finalSigners,
        confirmOptions,
      );
      return res;
    };
  }
}
