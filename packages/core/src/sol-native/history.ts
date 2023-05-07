import { Pubkey, Result } from '@solana-suite/shared';
import { FilterType, UserSideOutput } from '../types/';
import { TransactionFilter } from '../transaction-filter';
import { Signatures } from '../signatures';

export namespace SolNative {
  export const getHistory = async (
    searchPubkey: Pubkey,
    callback: (result: Result<UserSideOutput.History[], Error>) => void,
    options?: {
      actionFilter?: FilterType[];
    }
  ): Promise<void> => {
    try {
      if (options === undefined || !Object.keys(options).length) {
        options = {
          actionFilter: [],
        };
      }

      const actionFilter =
        options?.actionFilter !== undefined && options.actionFilter.length > 0
          ? options.actionFilter
          : [FilterType.Transfer];

      const transactions = await Signatures.getForAdress(searchPubkey);

      TransactionFilter.parse(transactions, FilterType.Memo);
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
}
