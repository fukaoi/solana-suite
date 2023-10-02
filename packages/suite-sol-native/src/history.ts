import { Pubkey } from "~/types/account";
import {
  FilterType,
  History,
  HistoryOptions,
  ModuleName,
  OnErr,
  OnOk,
} from "~/types/core";
import { Signatures, TransactionFilter } from "~/transaction-filter";

export namespace SolNative {
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

      const parser = TransactionFilter.parse(filterType, ModuleName.SolNative);
      await Signatures.getForAdress(
        target,
        parser,
        async (result) => await result.match(onOk, onErr),
        mergedOptions,
      );
    } catch (e) {
      if (e instanceof Error) {
        onErr(e);
      }
    }
  };
}
