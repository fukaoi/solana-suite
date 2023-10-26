import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { debugLog, Node, Pubkey } from '@solana-suite/shared';
import {
  FilterType,
  History,
  HistoryOptions,
  ModuleName,
  OnErr,
  OnOk,
  UserSideOutput,
} from '../types/';
import { Signatures } from '../signatures';
import { TransactionFilter } from '../transaction-filter';

export namespace SplToken {
  export const getHistory = async (
    target: Pubkey,
    filterType: FilterType,
    onOk: OnOk<History>,
    onErr: OnErr,
    options: Partial<HistoryOptions> = {},
  ): Promise<void> => {
    try {
      const defaultValues: HistoryOptions = {
        waitTime: 0.03,
        narrowDown: 100,
      };
      const mergedOptions = { ...defaultValues, ...options };
      if (filterType === FilterType.Memo) {
        const parser = TransactionFilter.parse(filterType, ModuleName.SplToken);
        await Signatures.getForAdress(
          target,
          parser,
          (result) => result.match(onOk, onErr),
          mergedOptions,
        );
      } else {
        const tokenAccounts =
          await Node.getConnection().getParsedTokenAccountsByOwner(
            target.toPublicKey(),
            {
              programId: TOKEN_PROGRAM_ID,
            },
          );

        const storedHistories: UserSideOutput.History[] = [];
        debugLog('# tokenAccounts size: ', tokenAccounts.value.length);
        for (const account of tokenAccounts.value) {
          const parser = TransactionFilter.parse(
            filterType,
            ModuleName.SplToken,
          );
          await Signatures.getForAdress(
            account.pubkey.toString(),
            parser,
            (result) => result.match(onOk, onErr),
            mergedOptions,
            storedHistories,
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
