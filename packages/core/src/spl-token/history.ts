import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Pubkey, Result } from '@solana-suite/shared';
import { FilterType, UserSideOutput } from '../types/';
import { Signatures } from '../signatures';
import { TransactionFilter } from '../transaction-filter';

export namespace SplToken {
  export const getHistory = async (
    mint: Pubkey,
    target: Pubkey,
    filterType: FilterType,
    callback: (result: Result<UserSideOutput.History, Error>) => void,
    receiveLimit?: number,
    narrowDown: number = 1000 // Max number
  ): Promise<void> => {
    try {
      const tokenAccount = await getAssociatedTokenAddress(
        mint.toPublicKey(),
        target.toPublicKey(),
        true
      );
      const parser = TransactionFilter.parse(filterType);
      await Signatures.getForAdress(
        tokenAccount.toString(),
        parser,
        callback,
        narrowDown,
        receiveLimit
      );
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
}
