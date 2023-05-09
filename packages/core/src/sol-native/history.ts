import { Pubkey, Result } from '@solana-suite/shared';
import { FilterType, UserSideOutput } from '../types/';
import { TransactionFilter } from '../transaction-filter';
import { Signatures } from '../signatures';

export namespace SolNative {
  export const getHistory = async (
    target: Pubkey,
    filterType: FilterType,
    callback: (result: Result<UserSideOutput.History[], Error>) => void,
    narrowDown = 1000 // Max number: 1000
  ): Promise<void> => {
    try {
      const parser = TransactionFilter.parse(filterType);
      await Signatures.getForAdress(target, parser, callback, narrowDown);
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
}
