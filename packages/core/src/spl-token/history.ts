import { getAssociatedTokenAddress } from '@solana/spl-token';
import { debugLog, Pubkey, Result } from '@solana-suite/shared';
import { FilterType, UserSideOutput } from '../types/';
import { Signatures } from '../signatures';
import { TransactionFilter } from '../transaction-filter';

export namespace SplToken {
  const DEFAULT_FILTER = [FilterType.Transfer];

  export const getHistory = async (
    mint: Pubkey,
    target: Pubkey,
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
          : DEFAULT_FILTER;

      const tokenAccount = await getAssociatedTokenAddress(
        mint.toPublicKey(),
        target.toPublicKey(),
        true
      );

      debugLog('# tokenAccount: ', tokenAccount.toString());

      const transactions = await Signatures.getForAdress(
        tokenAccount.toString()
      );

      debugLog('# getTransactionHistory transactions :', transactions);

      TransactionFilter.parse(
        transactions,
        FilterType.Memo //todo
      );
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
}
