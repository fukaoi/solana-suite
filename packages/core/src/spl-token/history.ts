import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Node, Pubkey, Result, sleep } from '@solana-suite/shared';
import { FilterType, ModuleName, UserSideOutput } from '../types/';
import { Signatures } from '../signatures';
import { TransactionFilter } from '../transaction-filter';
import { SplToken as _Find } from './find';

export namespace SplToken {
  export const getHistory = async (
    target: Pubkey,
    filterType: FilterType,
    callback: (result: Result<UserSideOutput.History[], Error>) => void,
    narrowDown = 1000 // Max number: 1000
  ): Promise<void> => {
    try {
      if (filterType === FilterType.Memo) {
        const parser = TransactionFilter.parse(filterType, ModuleName.SplToken);
        await Signatures.getForAdress(
          target,
          parser,
          callback,
          narrowDown
        );
      } else {
        const tokenAccounts =
          await Node.getConnection().getParsedTokenAccountsByOwner(
            target.toPublicKey(),
            {
              programId: TOKEN_PROGRAM_ID,
            }
          );

        for (const account of tokenAccounts.value) {
          const parser = TransactionFilter.parse(
            filterType,
            ModuleName.SplToken
          );
          await Signatures.getForAdress(
            account.pubkey.toString(),
            parser,
            callback,
            narrowDown
          );
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        callback(Result.err(e));
      }
    }
  };
}
