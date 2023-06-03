import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { Node, Pubkey, Result } from '@solana-suite/shared';
import { FilterType, History, ModuleName, UserSideOutput } from '../types/';
import { Signatures } from '../signatures';
import { TransactionFilter } from '../transaction-filter';

export namespace SplToken {
  export const getHistory = async (
    target: Pubkey,
    filterType: FilterType,
    onOk: History.OnOk,
    onErr: History.OnErr,
    narrowDown = 1000 // Max number: 1000
  ): Promise<void> => {
    try {
      if (filterType === FilterType.Memo) {
        const parser = TransactionFilter.parse(filterType, ModuleName.SplToken);
        await Signatures.getForAdress(
          target,
          parser,
          (result) => result.match(onOk, onErr),
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
            (result) => result.match(onOk, onErr),
            narrowDown
          );
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        onErr(e);
      }
    }
  };
}
