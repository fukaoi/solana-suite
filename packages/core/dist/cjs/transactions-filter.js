"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsFilter = void 0;
const shared_1 = require("@solana-suite/shared");
const memo_1 = require("./convert/memo");
const transfer_1 = require("./convert/transfer");
const types_1 = require("./types");
//@internal
var TransactionsFilter;
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
                        const res = transfer_1.Convert.Transfer.intoUserSide(searchKey, instruction, tx, directionFilter, mappingTokenAccount, isToken, withMemos);
                        res && hist.push(res);
                        callback(shared_1.Result.ok(hist));
                        // Only memo
                    }
                    else if (filterOptions.includes(types_1.FilterType.OnlyMemo)) {
                        const res = memo_1.Convert.Memo.intoUserSide(searchKey, instruction, tx, directionFilter);
                        res && hist.push(res);
                        callback(shared_1.Result.ok(hist));
                    }
                }
            });
        });
    };
})(TransactionsFilter = exports.TransactionsFilter || (exports.TransactionsFilter = {}));
//# sourceMappingURL=transactions-filter.js.map