import { getAssociatedTokenAddress } from '@solana/spl-token';
import { debugLog, Pubkey, Result, Try } from '@solana-suite/shared';
import { DirectionFilter, Filter, TransferHistory } from '../types/history';
import { SolNative as _Get } from '../sol-native/get-by-address';
import { SolNative as _Filter } from '../sol-native/filter-transaction';

export namespace SplToken {
  export const getHistory = async (
    mint: Pubkey,
    target: Pubkey,
    options?: {
      actionFilter?: Filter[];
      directionFilter?: DirectionFilter;
    }
  ): Promise<Result<TransferHistory[], Error>> => {
    return Try(async () => {
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

      return _Filter.filterTransactions(
        target.toPublicKey(),
        transactions,
        actionFilter,
        true,
        options.directionFilter
      );
    });
  };
}
