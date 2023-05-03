import { getAssociatedTokenAddress } from '@solana/spl-token';
import { debugLog, Pubkey, Result } from '@solana-suite/shared';
import { DirectionFilter, FilterType, UserSideOutput } from '../types/';
import { SolNative as _Get } from '../sol-native/get-by-address';
import { TransactionsFilter } from '../transactions-filter';

export namespace SplToken {
  export const getHistory = async (
    mint: Pubkey,
    target: Pubkey,
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

      const tokenAccount = await getAssociatedTokenAddress(
        mint.toPublicKey(),
        target.toPublicKey(),
        true
      );

      debugLog('# tokenAccount: ', tokenAccount.toString());

      const transactions = await _Get.getByAddress(tokenAccount.toString());

      debugLog('# getTransactionHistory transactions :', transactions);

      TransactionsFilter.parse(
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
