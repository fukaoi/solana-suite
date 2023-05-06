import { debugLog, Pubkey, Result } from '@solana-suite/shared';
import { DirectionFilter, FilterType, UserSideOutput } from '../types/';
import { TransactionFilter } from '../transaction-filter';
import { SolNative as _Get } from './get-by-address';

export namespace SolNative {
  export const getHistory = async (
    searchPubkey: Pubkey,
    callback: (result: Result<UserSideOutput.History[], Error>) => void,
    options?: {
      actionFilter?: FilterType[];
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
          : [FilterType.Transfer, FilterType.TransferChecked];

      const transactions = await _Get.getByAddress(searchPubkey);

      TransactionFilter.parse(
        searchPubkey.toPublicKey(),
        transactions,
        actionFilter,
        false,
        options.directionFilter
      );
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
}
