import {
  LAMPORTS_PER_SOL,
  PublicKey,
} from '@solana/web3.js';

import {
  Result,
  Node,
  debugLog,
} from '@solana-suite/shared';

import { TransferHistory, Filter, DirectionFilter } from '../types/find';
import { Internals_Find } from '../internals/_find';

export namespace SolNative {
  type Unit = 'sol' | 'lamports';

  export const findByOwner = async (
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
      const transactions = await Internals_Find.getForAddress(
        searchPubkey,
        bufferedLimit,
        before
      );
      debugLog('# getTransactionHistory loop');
      const res = Internals_Find.filterTransactions(
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

  export const getBalance = async (
    pubkey: PublicKey,
    unit: Unit = 'sol'
  ): Promise<Result<number, Error>> => {
    const balance = await Node.getConnection()
      .getBalance(pubkey)
      .then(Result.ok)
      .catch(Result.err);

    if (balance.isErr) {
      return balance;
    }

    switch (unit) {
      case 'sol':
        return Result.ok(balance.value / LAMPORTS_PER_SOL);
      case 'lamports':
        return balance;
      default:
        return Result.err(Error('no match unit'));
    }
  };
}
