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
export namespace TransactionFilter {
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
    directionFilter?: DirectionFilter
  ) => {
    const history: UserSideOutput.History[] = [];
    const mappingTokenAccount: MappingTokenAccount[] = [];
    const withMemos: WithMemo[] = [];

    transactions.forEach((tx) => {
      if (!tx.transaction) {
        return [];
      }

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

      // case: Transfer
      tx.transaction.message.instructions.forEach((instruction) => {
        if (isParsedInstruction(instruction)) {
          console.log('TYPE:::', instruction.parsed.type, instruction.program);
          if (isToken && instruction.program !== 'spl-token') {
            return [];
          }

          // Set Memo data
          if (
            isParsedInstruction(instruction) &&
            instruction.program === 'spl-memo'
          ) {
            withMemos.push({
              sig: tx.transaction.signatures,
              memo: instruction.parsed as string,
            });
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
            res && history.push(res);
            return Result.ok(history);
            // case: Only memo transaction
          } else if (filterOptions.includes(FilterType.OnlyMemo)) {
            const res = _Memo.Memo.intoUserSide(
              searchKey,
              instruction,
              tx,
              directionFilter
            );
            res && history.push(res);
            return Result.ok(history);
          }
          return history;
        }
      });
    });
  };
}
