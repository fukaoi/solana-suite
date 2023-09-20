import { Convert as _Memo } from './convert/memo';
import { Convert as _Mint } from './convert/mint';
import { Convert as _Transfer } from './convert/transfer';
import { Convert as _TransferChecked } from './convert/transfer-checked';
import { ParsedInstruction, ParsedTransactionWithMeta } from '@solana/web3.js';
import {
  FilterOptions,
  FilterType,
  ModuleName,
  PostTokenAccount,
  UserSideOutput,
} from './types';
import { debugLog } from '@solana-suite/shared';

//@internal
export namespace TransactionFilter {
  const createPostTokenAccountList = (
    transaction: ParsedTransactionWithMeta,
  ): PostTokenAccount[] => {
    const postTokenAccount: PostTokenAccount[] = [];
    const accountKeys = transaction.transaction.message.accountKeys.map((t) =>
      t.pubkey.toString(),
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
    arg: unknown,
  ): arg is ParsedInstruction => {
    return arg !== null && typeof arg === 'object' && 'parsed' in arg;
  };

  export const parse =
    (filterType: FilterType, moduleName: ModuleName) =>
    (txMeta: ParsedTransactionWithMeta): UserSideOutput.History | undefined => {
      let history: UserSideOutput.History | undefined;

      if (
        filterType === FilterType.Mint &&
        moduleName === ModuleName.SolNative
      ) {
        throw Error(
          'This filterType(\'FilterType.Mint\') can not use from SolNative module',
        );
      }

      if (!txMeta) {
        return history;
      }

      const postTokenAccount = createPostTokenAccountList(txMeta);

      txMeta.transaction.message.instructions.forEach((instruction) => {
        if (isParsedInstruction(instruction)) {
          switch (filterType) {
            case FilterType.Memo: {
              if (FilterOptions.Memo.program.includes(instruction.program)) {
                // console.log(txMeta.transaction.message.instructions);
                let instructionTransfer;

                // fetch  transfer transaction for relational memo
                txMeta.transaction.message.instructions.forEach(
                  (instruction) => {
                    if (
                      isParsedInstruction(instruction) &&
                      FilterOptions.Transfer.program.includes(
                        instruction.program,
                      )
                    ) {
                      instructionTransfer = instruction;
                    }
                  },
                );

                // spl-token or system
                if (
                  instructionTransfer &&
                  moduleName !== instructionTransfer['program']
                ) {
                  debugLog(
                    '# FilterType.Memo break instruction: ',
                    instructionTransfer,
                  );
                  break;
                }

                // fetch memo only transaction
                history = _Memo.Memo.intoUserSide(
                  instruction,
                  txMeta,
                  instructionTransfer,
                  postTokenAccount,
                );
              }
              break;
            }
            case FilterType.OnlyMemo: {
              if (FilterOptions.Memo.program.includes(instruction.program)) {
                let instructionTransfer;

                history = _Memo.Memo.intoUserSide(
                  instruction,
                  txMeta,
                  instructionTransfer,
                  postTokenAccount,
                );
              }
              break;
            }
            case FilterType.Mint: {
              if (
                FilterOptions.Mint.program.includes(instruction.program) &&
                FilterOptions.Mint.action.includes(
                  instruction.parsed.type as string,
                )
              ) {
                history = _Mint.Mint.intoUserSide(instruction, txMeta);
              }
              break;
            }
            case FilterType.Transfer:
              if (
                moduleName === instruction.program &&
                FilterOptions.Transfer.action.includes(
                  instruction.parsed.type as string,
                )
              ) {
                if (instruction.parsed.type === 'transferChecked') {
                  history = _TransferChecked.TransferChecked.intoUserSide(
                    instruction,
                    txMeta,
                    postTokenAccount,
                  );
                } else {
                  history = _Transfer.Transfer.intoUserSide(
                    instruction,
                    txMeta,
                  );
                }
              }
          }
        }
      });
      return history;
    };
}
