import { Result } from '@solana-suite/shared';
import { Convert as _Memo } from './convert/memo';
import { Convert as _Transfer } from './convert/transfer';
import { FilterType, } from './types';
//@internal
export var TransactionsFilter;
(function (TransactionsFilter) {
    TransactionsFilter.isParsedInstruction = (arg) => {
        return arg !== null && typeof arg === 'object' && 'parsed' in arg;
    };
    TransactionsFilter.parse = (searchKey, transactions, filterOptions, isToken = false, callback, directionFilter) => {
        const hist = [];
        const mappingTokenAccount = [];
        transactions.forEach((tx) => {
            var _a, _b;
            if (!tx.transaction)
                return;
            const accountKeys = tx.transaction.message.accountKeys.map((t) => t.pubkey.toString());
            // set  mapping list
            (_b = (_a = tx.meta) === null || _a === void 0 ? void 0 : _a.postTokenBalances) === null || _b === void 0 ? void 0 : _b.forEach((t) => {
                if (accountKeys[t.accountIndex] && t.owner) {
                    const v = {
                        account: accountKeys[t.accountIndex],
                        owner: t.owner,
                    };
                    mappingTokenAccount.push(v);
                }
            });
            // set transaction with memo
            const withMemos = [];
            tx.transaction.message.instructions.forEach((v) => {
                if (TransactionsFilter.isParsedInstruction(v) && v.program === 'spl-memo') {
                    withMemos.push({
                        sig: tx.transaction.signatures,
                        memo: v.parsed,
                    });
                }
            });
            // Transfer
            tx.transaction.message.instructions.forEach((instruction) => {
                if (TransactionsFilter.isParsedInstruction(instruction)) {
                    if (isToken && instruction.program !== 'spl-token') {
                        return;
                    }
                    if (filterOptions.includes(instruction.parsed.type)) {
                        const res = _Transfer.Transfer.intoUserSide(searchKey, instruction, tx, directionFilter, mappingTokenAccount, isToken, withMemos);
                        res && hist.push(res);
                        callback(Result.ok(hist));
                        // Only memo
                    }
                    else if (filterOptions.includes(FilterType.OnlyMemo)) {
                        const res = _Memo.Memo.intoUserSide(searchKey, instruction, tx, directionFilter);
                        res && hist.push(res);
                        callback(Result.ok(hist));
                    }
                }
            });
        });
    };
})(TransactionsFilter || (TransactionsFilter = {}));
//# sourceMappingURL=transactions-filter.js.map