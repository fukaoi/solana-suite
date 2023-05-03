import { debugLog, Pubkey, Result } from '@solana-suite/shared';
import { DirectionFilter, Filter, History } from '../types/history';
import { SolNative as _Filter } from './filter-transaction';
import { SolNative as _Get } from './get-by-address';

export namespace SolNative {
  export const getHistory = async (
    searchPubkey: Pubkey,
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

      const transactions = await _Get.getByAddress(searchPubkey);
      debugLog('# getTransactionHistory loop');

      _Filter.filterTransactions(
        searchPubkey.toPublicKey(),
        transactions,
        actionFilter,
        false,
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
