"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionFilter = void 0;
const memo_1 = require("./convert/memo");
const mint_1 = require("./convert/mint");
const transfer_1 = require("./convert/transfer");
const transfer_checked_1 = require("./convert/transfer-checked");
const types_1 = require("./types");
const shared_1 = require("@solana-suite/shared");
//@internal
var TransactionFilter;
(function (TransactionFilter) {
    const createPostTokenAccountList = (transaction) => {
        var _a, _b;
        const postTokenAccount = [];
        const accountKeys = transaction.transaction.message.accountKeys.map((t) => t.pubkey.toString());
        (_b = (_a = transaction.meta) === null || _a === void 0 ? void 0 : _a.postTokenBalances) === null || _b === void 0 ? void 0 : _b.forEach((t) => {
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
    TransactionFilter.isParsedInstruction = (arg) => {
        return arg !== null && typeof arg === 'object' && 'parsed' in arg;
    };
    TransactionFilter.parse = (filterType, moduleName) => (txMeta) => {
        let history;
        if (filterType === types_1.FilterType.Mint &&
            moduleName === types_1.ModuleName.SolNative) {
            throw Error(`This filterType('FilterType.Mint') can not use from SolNative module`);
        }
        if (!txMeta) {
            return history;
        }
        const postTokenAccount = createPostTokenAccountList(txMeta);
        txMeta.transaction.message.instructions.forEach((instruction) => {
            if (TransactionFilter.isParsedInstruction(instruction)) {
                switch (filterType) {
                    case types_1.FilterType.Memo: {
                        if (types_1.FilterOptions.Memo.program.includes(instruction.program)) {
                            // console.log(txMeta.transaction.message.instructions);
                            let instructionTransfer;
                            // fetch  transfer transaction for relational memo
                            txMeta.transaction.message.instructions.forEach((instruction) => {
                                if (TransactionFilter.isParsedInstruction(instruction) &&
                                    types_1.FilterOptions.Transfer.program.includes(instruction.program)) {
                                    instructionTransfer = instruction;
                                }
                            });
                            // spl-token or system
                            if (instructionTransfer &&
                                moduleName !== instructionTransfer['program']) {
                                (0, shared_1.debugLog)('# FilterType.Memo break instruction: ', instructionTransfer);
                                break;
                            }
                            // fetch memo only transaction
                            history = memo_1.Convert.Memo.intoUserSide(instruction, txMeta, instructionTransfer, postTokenAccount);
                        }
                        break;
                    }
                    case types_1.FilterType.OnlyMemo: {
                        if (types_1.FilterOptions.Memo.program.includes(instruction.program)) {
                            let instructionTransfer;
                            history = memo_1.Convert.Memo.intoUserSide(instruction, txMeta, instructionTransfer, postTokenAccount);
                        }
                        break;
                    }
                    case types_1.FilterType.Mint: {
                        if (types_1.FilterOptions.Mint.program.includes(instruction.program) &&
                            types_1.FilterOptions.Mint.action.includes(instruction.parsed.type)) {
                            history = mint_1.Convert.Mint.intoUserSide(instruction, txMeta);
                        }
                        break;
                    }
                    case types_1.FilterType.Transfer:
                        if (moduleName === instruction.program &&
                            types_1.FilterOptions.Transfer.action.includes(instruction.parsed.type)) {
                            if (instruction.parsed.type === 'transferChecked') {
                                history = transfer_checked_1.Convert.TransferChecked.intoUserSide(instruction, txMeta, postTokenAccount);
                            }
                            else {
                                history = transfer_1.Convert.Transfer.intoUserSide(instruction, txMeta);
                            }
                        }
                }
            }
        });
        return history;
    };
})(TransactionFilter = exports.TransactionFilter || (exports.TransactionFilter = {}));
//# sourceMappingURL=transaction-filter.js.map