import {
  PublicKey,
} from '@solana/web3.js';

import {
  Result,
  debugLog,
} from '@solana-suite/shared';

import { TransferHistory, Filter, DirectionFilter } from '../types/history';
import { Internals_History } from '../internals/_history';

export namespace SolNative {
  export const getHistory = async (
    searchPubkey: PublicKey,
    options?: {
      limit?: number;
      actionFilter?: Filter[];
      directionFilter?: DirectionFilter;
    }
  ): Promise<Result<TransferHistory[], Error>> => {
    if (options === undefined || !Object.keys(options).length) {
      options = {
        limit: 0,
        actionFilter: [],
        directionFilter: undefined,
      };
    }

    const actionFilter =
      options?.actionFilter !== undefined && options.actionFilter.length > 0
        ? options.actionFilter
        : [Filter.Transfer, Filter.TransferChecked];

    let bufferedLimit = 0;
    if (options.limit && options.limit < 50) {
      bufferedLimit = options.limit * 1.5; // To get more data, threshold
    } else {
      bufferedLimit = 10;
      options.limit = 10;
    }
    let hist: TransferHistory[] = [];
    let before;

    while (true) {
      const transactions = await Internals_History.getForAddress(
        searchPubkey,
        bufferedLimit,
        before
      );
      debugLog('# getTransactionHistory loop');
      const res = Internals_History.filterTransactions(
        searchPubkey,
        transactions,
        actionFilter,
        false,
        options.directionFilter
      );
      hist = hist.concat(res);
      if (hist.length >= options.limit || res.length === 0) {
        hist = hist.slice(0, options.limit);
        break;
      }
      before = hist[hist.length - 1].sig;
    }
    return Result.ok(hist);
  };
}
