import { Pubkey } from '@solana-suite/shared';
import { FilterType, History, ModuleName, OnErr, OnOk } from '../types/';
import { TransactionFilter } from '../transaction-filter';
import { Signatures } from '../signatures';

export namespace SolNative {
  export const getHistory = async (
    target: Pubkey,
    filterType: FilterType,
    onOk: OnOk<History>,
    onErr: OnErr,
    narrowDown = 1000, // Max number: 1000
  ): Promise<void> => {
    try {
      const parser = TransactionFilter.parse(filterType, ModuleName.SolNative);
      await Signatures.getForAdress(
        target,
        parser,
        async (result) => await result.match(onOk, onErr),
        narrowDown,
      );
    } catch (e) {
      if (e instanceof Error) {
        onErr(e);
      }
    }
  };
}
