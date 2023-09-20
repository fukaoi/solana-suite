import { Pubkey } from '@solana-suite/shared';
import { FilterType, History, ModuleName, OnErr, OnOk } from '../types/';
import { TransactionFilter } from '../transaction-filter';
import { Signatures } from '../signatures';

export namespace Memo {
  export const getHistory = async (
    target: Pubkey,
    onOk: OnOk<History>,
    onErr: OnErr,
    narrowDown = 1000, // Max number: 1000
  ): Promise<void> => {
    try {
      const parser = TransactionFilter.parse(
        FilterType.OnlyMemo,
        ModuleName.SolNative,
      );
      await Signatures.getForAdress(
        target,
        parser,
        (result) => result.match(onOk, onErr),
        narrowDown,
      );
    } catch (e) {
      if (e instanceof Error) {
        onErr(e);
      }
    }
  };
}
