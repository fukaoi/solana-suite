import { getAssociatedTokenAddress } from '@solana/spl-token';
import { debugLog, Pubkey, Result } from '@solana-suite/shared';
import { DirectionFilter, Filter, History } from '../types/history';
import { SolNative as _Get } from '../sol-native/get-by-address';
import { SolNative as _Filter } from '../sol-native/filter-transaction';

export namespace SplToken {
  export const getHistory = async (
    mint: Pubkey,
    target: Pubkey,
    callback: (result: Result<History[], Error>) => void,
    options?: {
      actionFilter?: Filter[];
      directionFilter?: DirectionFilter;
    }
  ): Promise<void> => {
    try {
      if (options === undefined || !Object.keys(options).length) {
        options = {
          actionFilter: [],
          directionFilter: undefined,
        };
      }

      const actionFilter =
        options?.actionFilter !== undefined && options.actionFilter.length > 0
          ? options.actionFilter
          : [Filter.Transfer, Filter.TransferChecked];

      const tokenAccount = await getAssociatedTokenAddress(
        mint.toPublicKey(),
        target.toPublicKey(),
        true
      );

      debugLog('# searchKeyAccount: ', tokenAccount.toString());

      const transactions = await _Get.getByAddress(tokenAccount.toString());

      debugLog('# getTransactionHistory transactions :', transactions);

      _Filter.filterTransactions(
        target.toPublicKey(),
        transactions,
        actionFilter,
        true,
        callback,
        options.directionFilter
      );
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
}
