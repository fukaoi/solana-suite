import { Result } from '@solana-suite/shared';
import { Convert as _Memo } from './convert/memo';
import { Convert as _Transfer } from './convert/transfer';
import {
  ParsedInstruction,
  ParsedTransactionWithMeta,
  PublicKey,
} from '@solana/web3.js';
import {
  DirectionFilter,
  FilterType,
  MappingTokenAccount,
  UserSideOutput,
  WithMemo,
} from './types';

//@internal
export namespace TransactionsFilter {
  export const isParsedInstruction = (
    arg: unknown
  ): arg is ParsedInstruction => {
    return arg !== null && typeof arg === 'object' && 'parsed' in arg;
  };
  export const parse = (
    searchKey: PublicKey,
    transactions: ParsedTransactionWithMeta[],
    filterOptions: FilterType[],
    isToken = false,
    callback: (result: Result<UserSideOutput.History[], Error>) => void,
    directionFilter?: DirectionFilter
  ): void => {
    const hist: UserSideOutput.History[] = [];
    const mappingTokenAccount: MappingTokenAccount[] = [];
    transactions.forEach((tx) => {
      if (!tx.transaction) return;

      const accountKeys = tx.transaction.message.accountKeys.map((t) =>
        t.pubkey.toString()
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
        console.log('v:', v);
        if (isParsedInstruction(v) && v.program === 'spl-memo') {
          withMemos.push({
            sig: tx.transaction.signatures,
            memo: v.parsed as string,
          });
        }
      });

      // Transfer
      tx.transaction.message.instructions.forEach((instruction) => {
        if (isParsedInstruction(instruction)) {
          if (isToken && instruction.program !== 'spl-token') {
            return;
          }

          if (filterOptions.includes(instruction.parsed.type as FilterType)) {
            const res = _Transfer.Transfer.intoUserSide(
              searchKey,
              instruction,
              tx,
              directionFilter,
              mappingTokenAccount,
              isToken,
              withMemos
            );
            res && hist.push(res);
            callback(Result.ok(hist));
            // Only memo
          } else if (filterOptions.includes(FilterType.OnlyMemo)) {
            const res = _Memo.Memo.intoUserSide(
              searchKey,
              instruction,
              tx,
              directionFilter
            );
            res && hist.push(res);
            callback(Result.ok(hist));
          }
        }
      });
    });
  };
}
