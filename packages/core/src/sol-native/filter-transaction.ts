import {
  PublicKey,
  ParsedTransactionWithMeta,
  ParsedInstruction,
} from '@solana/web3.js';

import {
  TransferHistory,
  DirectionFilter,
  Filter,
  WithMemo,
  MappingTokenAccount,
} from '../types/history';

import { SolNative as _Is } from './is-parsed-instruction';

//@internal
export namespace SolNative {
  const convertTimestampToDate = (blockTime: number): Date => {
    return new Date(blockTime * 1000);
  };

  const createHistory = (
    searchKey: PublicKey,
    instruction: ParsedInstruction,
    meta: ParsedTransactionWithMeta,
    directionFilter?: DirectionFilter,
    mappingTokenAccount?: MappingTokenAccount[],
    isToken?: boolean,
    withMemos?: WithMemo[]
  ) => {
    const v: TransferHistory = instruction.parsed as TransferHistory;

    if (isToken && mappingTokenAccount && instruction.program === 'spl-token') {
      const foundSource = mappingTokenAccount.find(
        (m) => m.account === v.info.source
      );
      const foundDest = mappingTokenAccount.find(
        (m) => m.account === v.info.destination
      );

      foundSource && (v.info.source = foundSource.owner);
      foundDest && (v.info.destination = foundDest.owner);
    }

    v.date = convertTimestampToDate(meta.blockTime as number);
    v.sig = meta.transaction.signatures[0];
    v.innerInstruction = false;
    if (withMemos && withMemos.length > 0) {
      const finded = withMemos.find(
        (obj) => obj.sig === meta.transaction.signatures
      );
      finded && (v.memo = finded.memo);
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
    v.memo = instruction.parsed as string;
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

  export const filterTransactions = (
    searchKey: PublicKey,
    transactions: ParsedTransactionWithMeta[],
    filterOptions: Filter[],
    isToken = false,
    directionFilter?: DirectionFilter
  ) => {
    const hist: TransferHistory[] = [];
    const mappingTokenAccount: MappingTokenAccount[] = [];
    transactions.forEach((tx) => {
      if (!tx.transaction) return;

      const accountKeys = tx.transaction.message.accountKeys.map((t) =>
        t.pubkey.toBase58()
      );
      // set  mapping list
      tx.meta?.postTokenBalances?.forEach((t) => {
        if (accountKeys[t.accountIndex] && t.owner) {
          const v = {
            account: accountKeys[t.accountIndex],
            owner: t.owner,
          };
          mappingTokenAccount.push(v);
        }
      });

      // set transaction with memo
      const withMemos: WithMemo[] = [];
      tx.transaction.message.instructions.forEach((v) => {
        if (_Is.isParsedInstruction(v) && v.program === 'spl-memo') {
          withMemos.push({
            sig: tx.transaction.signatures,
            memo: v.parsed as string,
          });
        }
      });

      tx.transaction.message.instructions.forEach((instruction) => {
        if (_Is.isParsedInstruction(instruction)) {
          if (isToken && instruction.program !== 'spl-token') {
            return;
          }

          if (filterOptions.includes(instruction.parsed.type as Filter)) {
            const res = createHistory(
              searchKey,
              instruction,
              tx,
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
                tx,
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
}
