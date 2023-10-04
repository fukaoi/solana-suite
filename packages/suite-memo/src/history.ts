import { Pubkey } from '~/types/account';
import { History, HistoryOptions } from '~/types/history';
import { OnErr, OnOk } from '~/types/shared';
import { FilterType, ModuleName } from '~/types/transaction-filter';
import { Signatures, TransactionFilter } from '~/transaction-filter';

export namespace Memo {
  export const getHistory = async (
    target: Pubkey,
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
      const parser = TransactionFilter.parse(
        FilterType.OnlyMemo,
        ModuleName.SolNative,
      );
      await Signatures.getForAdress(
        target,
        parser,
        (result) => result.match(onOk, onErr),
        mergedOptions,
      );
    } catch (e) {
      if (e instanceof Error) {
        onErr(e);
      }
    }
  };
}
