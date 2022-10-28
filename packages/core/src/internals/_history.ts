import {
  PublicKey,
  ParsedTransactionWithMeta,
  ParsedInstruction,
} from '@solana/web3.js';

import { Node } from '@solana-suite/shared';
import { TransferHistory, DirectionFilter, Filter } from '../types/history';

//@internal
export namespace Internals_History {
  const convertTimestampToDate = (blockTime: number): Date => {
    return new Date(blockTime * 1000);
  };

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

    if (isToken && mappingTokenAccount && instruction.program === 'spl-token') {
      const foundSource = mappingTokenAccount.find(
        (m) => m.account === v.info.source
      );
      const foundDest = mappingTokenAccount.find(
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

  const get = async (signature: string): Promise<ParsedTransactionWithMeta> => {
    const res = await Node.getConnection().getParsedTransaction(signature);
    if (!res) {
      return {} as ParsedTransactionWithMeta;
    }
    return res;
  };

  // Parsed transaction instruction, Type Guard
  export const isParsedInstruction = (
    arg: unknown
  ): arg is ParsedInstruction => {
    return arg !== null && typeof arg === 'object' && 'parsed' in arg;
  };

  export const filterTransactions = (
    searchKey: PublicKey,
    transactions: ParsedTransactionWithMeta[],
    filterOptions: Filter[],
    isToken = false,
    directionFilter?: DirectionFilter
  ) => {
    const hist: TransferHistory[] = [];
    const mappingTokenAccount: { account: string; owner: string }[] = [];
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
      const withMemos: { sig: string[]; memo: string }[] = [];
      tx.transaction.message.instructions.forEach((v) => {
        if (isParsedInstruction(v) && v.program === 'spl-memo') {
          withMemos.push({
            sig: tx.transaction.signatures,
            memo: v.parsed,
          });
        }
      });

      tx.transaction.message.instructions.forEach((instruction) => {
        if (isParsedInstruction(instruction)) {
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

  // @todo: internal
  export const getForAddress = async (
    pubkey: PublicKey,
    limit?: number | undefined,
    before?: string | undefined,
    until?: string | undefined
  ): Promise<ParsedTransactionWithMeta[]> => {
    const transactions = await Node.getConnection().getSignaturesForAddress(
      pubkey,
      {
        limit,
        before,
        until,
      }
    );

    const signatures = transactions.map((tx) => get(tx.signature));
    return await Promise.all(signatures);
  };
}
