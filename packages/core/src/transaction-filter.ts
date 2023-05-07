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
  FilterOptions,
  FilterType,
  PostTokenAccount,
  UserSideOutput,
} from './types';

//@internal
export namespace TransactionFilter {
  const createPostTokenAccountList = (
    transaction: ParsedTransactionWithMeta
  ): PostTokenAccount[] => {
    const postTokenAccount: PostTokenAccount[] = [];
    const accountKeys = transaction.transaction.message.accountKeys.map((t) =>
      t.pubkey.toString()
    );

    transaction.meta?.postTokenBalances?.forEach((t) => {
      if (accountKeys[t.accountIndex] && t.owner) {
        const v = {
          account: accountKeys[t.accountIndex],
          owner: t.owner,
        };
        postTokenAccount.push(v);
      }
    });
    return postTokenAccount;
  };

  export const isParsedInstruction = (
    arg: unknown
  ): arg is ParsedInstruction => {
    return arg !== null && typeof arg === 'object' && 'parsed' in arg;
  };
  export const parse = (
    target: PublicKey,
    transactions: ParsedTransactionWithMeta[],
    filterType: FilterType,
    isToken = false,
    directionFilter?: DirectionFilter
  ): UserSideOutput.History[] => {
    const history: UserSideOutput.History[] = [];

    transactions.forEach((tx) => {
      if (!tx.transaction) {
        return [];
      }

      const postTokenAccount = createPostTokenAccountList(tx);

      tx.transaction.message.instructions.forEach((instruction) => {
        if (isParsedInstruction(instruction)) {
          switch (filterType) {
            case FilterType.Memo: {
              if (FilterOptions.Memo.program.includes(instruction.program)) {
                let instructionTransfer: ParsedInstruction = {
                  program: '',
                  programId: '0000000000000000000000000000000000'.toPublicKey(), //dummy
                  parsed: '',
                };

                // fetch  transfer transaction for relational memo
                tx.transaction.message.instructions.forEach((instruction) => {
                  if (
                    isParsedInstruction(instruction) &&
                    FilterOptions.Transfer.program.includes(instruction.program)
                  ) {
                    instructionTransfer = instruction;
                  }
                });

                // fetch memo only transaction
                const res = _Memo.Memo.intoUserSide(
                  target,
                  instruction,
                  instructionTransfer,
                  tx,
                  directionFilter,
                  postTokenAccount
                );
                res && history.push(res);
              }
              break;
            }
            case FilterType.Mint: {
            }
            case FilterType.Transfer:
            default:
              if (
                FilterOptions.Transfer.program.includes(instruction.program)
              ) {
                const res = _Transfer.Transfer.intoUserSide(
                  target,
                  instruction,
                  tx,
                  directionFilter,
                  postTokenAccount
                );
                res && history.push(res);
              }
              break;
          }
        }
      });
    });
    return history;
  };
}
