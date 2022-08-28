import { getAssociatedTokenAddress, TOKEN_PROGRAM_ID } from '@solana/spl-token';

import { PublicKey, TokenAmount, RpcResponseAndContext } from '@solana/web3.js';

import { Node, Result, debugLog } from '@solana-suite/shared';

import { TransferHistory, Filter, DirectionFilter } from '../types/find';
import { TokenInfoOwned } from '../types/spl-token';
import { Internals_Find } from '../internals/_find';
import { Internals_SplToken } from '../internals/_spl-token';

export namespace SplToken {
  // @todo history
  export const findByOwner = async (
    mint: PublicKey,
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

    const searchKeyAccount = await getAssociatedTokenAddress(
      mint,
      searchPubkey,
      true
    )
      .then(Result.ok)
      .catch(Result.err);

    if (searchKeyAccount.isErr) {
      return Result.err(searchKeyAccount.error);
    }

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
        searchKeyAccount.value,
        bufferedLimit,
        before
      );
      debugLog('# getTransactionHistory loop');
      const res = Internals_Find.filterTransactions(
        searchPubkey,
        transactions,
        actionFilter,
        true,
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
    mint: PublicKey
  ): Promise<Result<TokenAmount, Error>> => {
    const res = await Internals_SplToken.findAssociatedTokenAddress(
      mint,
      pubkey
    );
    if (res.isErr) {
      return Result.err(res.error);
    }
    return await Node.getConnection()
      .getTokenAccountBalance(res.unwrap())
      .then((rpc: RpcResponseAndContext<TokenAmount>) => Result.ok(rpc.value))
      .catch(Result.err);
  };

  // @todo: merge findByOwner
  export const getTokenInfoOwned = async (
    pubkey: PublicKey
  ): Promise<Result<TokenInfoOwned[], Error>> => {
    const res = await Node.getConnection()
      .getParsedTokenAccountsByOwner(pubkey, {
        programId: TOKEN_PROGRAM_ID,
      })
      .then(Result.ok)
      .catch(Result.err);

    if (res.isErr) {
      return Result.err(res.error);
    }

    const modified = res.unwrap().value.map((d) => {
      return {
        mint: d.account.data.parsed.info.mint,
        tokenAmount: d.account.data.parsed.info.tokenAmount.uiAmount,
      };
    });

    return Result.ok(modified);
  };
}
