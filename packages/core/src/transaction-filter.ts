import { Convert as _Memo } from './convert/memo';
import { Convert as _Mint } from './convert/mint';
import { Convert as _Transfer } from './convert/transfer';
import { Convert as _TransferChecked } from './convert/transfer-checked';
import { ParsedInstruction, ParsedTransactionWithMeta } from '@solana/web3.js';
import {
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
    transactions: ParsedTransactionWithMeta[],
    filterType: FilterType
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
                  programId: '1'.repeat(32).toPublicKey(), //dummy
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
                  instruction,
                  instructionTransfer,
                  tx,
                  postTokenAccount
                );
                res && history.push(res);
              }
              break;
            }
            case FilterType.Mint: {
              if (
                FilterOptions.Mint.program.includes(instruction.program) &&
                FilterOptions.Mint.action.includes(instruction.parsed.type)
              ) {
                const res = _Mint.Mint.intoUserSide(instruction, tx);
                res && history.push(res);
              }
              break;
            }
            case FilterType.Transfer:
              if (
                FilterOptions.Transfer.program.includes(instruction.program) &&
                FilterOptions.Transfer.action.includes(instruction.parsed.type)
              ) {
                let res;
                if (instruction.parsed.type === 'transferChecked') {
                  res = _TransferChecked.TransferChecked.intoUserSide(
                    instruction,
                    tx,
                    postTokenAccount
                  );
                } else {
                  res = _Transfer.Transfer.intoUserSide(instruction, tx);
                }
                res && history.push(res);
              }
              break;
            default:
              throw Error(`No match FilterType: ${filterType}`);
          }
        }
      });
    });
    return history;
  };
}
