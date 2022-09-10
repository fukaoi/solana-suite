import {
  PublicKey,
  ParsedTransactionWithMeta,
  ParsedInstruction,
} from '@solana/web3.js';

import { Node, Result } from '@solana-suite/shared';

import { TransferHistory, DirectionFilter, Filter } from '../types/history';

export namespace Internals_History {
  const createHistory = (
    searchKey: PublicKey,
    instruction: ParsedInstruction,
    meta: ParsedTransactionWithMeta,
    directionFilter?: DirectionFilter,
    mappingTokenAccount?: any[],
    isToken?: boolean,
    withMemos?: any[]
  ) => {
    const v: TransferHistory = instruction.parsed;

    if (isToken && instruction.program === 'spl-token') {
      const foundSource = mappingTokenAccount!.find(
        (m) => m.account === v.info.source
      );
      const foundDest = mappingTokenAccount!.find(
        (m) => m.account === v.info.destination
      );
      v.info.source = foundSource.owner;
      v.info.destination = foundDest.owner;
    }

    v.date = convertTimestampToDate(meta.blockTime as number);
    v.sig = meta.transaction.signatures[0];
    v.innerInstruction = false;
    if (withMemos && withMemos.length > 0) {
      v.memo = withMemos.find(
        (obj) => obj.sig === meta.transaction.signatures
      ).memo;
    }

    // inner instructions
    if (
      meta.meta?.innerInstructions &&
      meta.meta?.innerInstructions.length !== 0
    ) {
      v.innerInstruction = true;
    }

    if (directionFilter) {
      if (v.info[directionFilter] === searchKey.toString()) {
        return v;
      }
    } else {
      return v;
    }
  };

  const createMemoHistory = (
    searchKey: PublicKey,
    instruction: ParsedInstruction,
    value: ParsedTransactionWithMeta,
    directionFilter?: DirectionFilter
  ) => {
    const v: TransferHistory = {
      info: {},
      type: '',
      sig: '',
      date: new Date(),
      innerInstruction: false,
    };
    v.memo = instruction.parsed;
    v.type = instruction.program;
    v.date = convertTimestampToDate(value.blockTime as number);
    v.sig = value.transaction.signatures[0];
    v.innerInstruction = false;
    if (
      value.meta?.innerInstructions &&
      value.meta?.innerInstructions.length !== 0
    ) {
      // inner instructions
      v.innerInstruction = true;
    }
    if (directionFilter) {
      if (v.info[directionFilter] === searchKey.toString()) {
        return v;
      }
    } else {
      return v;
    }
  };

  export const isParsedInstruction = (arg: any): arg is ParsedInstruction => {
    return arg !== null && typeof arg === 'object' && arg.parsed;
  };

  export const filterTransactions = (
    searchKey: PublicKey,
    transactions: Result<ParsedTransactionWithMeta>[],
    filterOptions: Filter[],
    isToken: boolean = false,
    directionFilter?: DirectionFilter
  ) => {
    const hist: TransferHistory[] = [];
    const mappingTokenAccount: { account: string; owner: string }[] = [];
    transactions.forEach((tx) => {
      if (tx.isErr) return tx;
      if (!tx.value.transaction) return;

      const accountKeys = tx.value.transaction.message.accountKeys.map((t) =>
        t.pubkey.toBase58()
      );
      // set  mapping list
      tx.value.meta?.postTokenBalances?.forEach((t) => {
        if (accountKeys[t.accountIndex] && t.owner) {
          const v = {
            account: accountKeys[t.accountIndex],
            owner: t.owner,
          };
          mappingTokenAccount.push(v);
        }
      });

      // set transaction with memo
      const withMemos: { sig: string[]; memo: string }[] = [];
      tx.value.transaction.message.instructions.forEach((v) => {
        if (isParsedInstruction(v) && v.program === 'spl-memo') {
          withMemos.push({
            sig: tx.value.transaction.signatures,
            memo: v.parsed,
          });
        }
      });

      tx.value.transaction.message.instructions.forEach((instruction) => {
        if (isParsedInstruction(instruction)) {
          if (isToken && instruction.program !== 'spl-token') {
            return;
          }

          if (filterOptions.includes(instruction.parsed.type)) {
            const res = createHistory(
              searchKey,
              instruction,
              tx.value,
              directionFilter,
              mappingTokenAccount,
              isToken,
              withMemos
            );
            res && hist.push(res);
          } else {
            // Only memo
            if (filterOptions.includes(Filter.OnlyMemo)) {
              const res = createMemoHistory(
                searchKey,
                instruction,
                tx.value,
                directionFilter
              );
              res && hist.push(res);
            }
          }
        }
      });
    });
    return hist;
  };

  const convertTimestampToDate = (blockTime: number): Date =>
    new Date(blockTime * 1000);

  export const get = async (
    signature: string
  ): Promise<Result<ParsedTransactionWithMeta, Error>> => {
    const res = await Node.getConnection()
      .getParsedTransaction(signature)
      .then(Result.ok)
      .catch(Result.err);
    if (res.isErr) {
      return Result.err(res.error);
    } else {
      if (!res.value) {
        return Result.ok({} as ParsedTransactionWithMeta);
      }
      return Result.ok(res.value);
    }
  };

  // @todo: internal
  export const getForAddress = async (
    pubkey: PublicKey,
    limit?: number | undefined,
    before?: string | undefined,
    until?: string | undefined
  ): Promise<Result<ParsedTransactionWithMeta, Error>[]> => {
    const transactions = await Node.getConnection()
      .getSignaturesForAddress(pubkey, {
        limit,
        before,
        until,
      })
      .then(Result.ok)
      .catch(Result.err);

    if (transactions.isErr) {
      return [Result.err(transactions.error)];
    } else {
      const signatures = transactions.value.map((tx) => get(tx.signature));
      return await Promise.all(signatures);
    }
  };
}
