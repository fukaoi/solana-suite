"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolNative = void 0;
const history_1 = require("../types/history");
const is_parsed_instruction_1 = require("./is-parsed-instruction");
//@internal
var SolNative;
(function (SolNative) {
    const convertTimestampToDate = (blockTime) => {
        return new Date(blockTime * 1000);
    };
    const createHistory = (searchKey, instruction, meta, directionFilter, mappingTokenAccount, isToken, withMemos) => {
        var _a, _b;
        const v = instruction.parsed;
        if (isToken && mappingTokenAccount && instruction.program === 'spl-token') {
            const foundSource = mappingTokenAccount.find((m) => m.account === v.info.source);
            const foundDest = mappingTokenAccount.find((m) => m.account === v.info.destination);
            foundSource && (v.info.source = foundSource.owner);
            foundDest && (v.info.destination = foundDest.owner);
        }
        v.date = convertTimestampToDate(meta.blockTime);
        v.sig = meta.transaction.signatures[0];
        v.innerInstruction = false;
        if (withMemos && withMemos.length > 0) {
            const finded = withMemos.find((obj) => obj.sig === meta.transaction.signatures);
            finded && (v.memo = finded.memo);
        }
        // inner instructions
        if (((_a = meta.meta) === null || _a === void 0 ? void 0 : _a.innerInstructions) &&
            ((_b = meta.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions.length) !== 0) {
            v.innerInstruction = true;
        }
        if (directionFilter) {
            if (v.info[directionFilter] === searchKey.toString()) {
                return v;
            }
        }
        else {
            return v;
        }
    };
    const createMemoHistory = (searchKey, instruction, value, directionFilter) => {
        var _a, _b;
        const v = {
            info: {},
            type: '',
            sig: '',
            date: new Date(),
            innerInstruction: false,
        };
        v.memo = instruction.parsed;
        v.type = instruction.program;
        v.date = convertTimestampToDate(value.blockTime);
        v.sig = value.transaction.signatures[0];
        v.innerInstruction = false;
        if (((_a = value.meta) === null || _a === void 0 ? void 0 : _a.innerInstructions) &&
            ((_b = value.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions.length) !== 0) {
            // inner instructions
            v.innerInstruction = true;
        }
        if (directionFilter) {
            if (v.info[directionFilter] === searchKey.toString()) {
                return v;
            }
        }
        else {
            return v;
        }
    };
    SolNative.filterTransactions = (searchKey, transactions, filterOptions, isToken = false, directionFilter) => {
        const hist = [];
        const mappingTokenAccount = [];
        transactions.forEach((tx) => {
            var _a, _b;
            if (!tx.transaction)
                return;
            const accountKeys = tx.transaction.message.accountKeys.map((t) => t.pubkey.toBase58());
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
                if (is_parsed_instruction_1.SolNative.isParsedInstruction(v) &&
                    v.program === 'spl-memo') {
                    withMemos.push({
                        sig: tx.transaction.signatures,
                        memo: v.parsed,
                    });
                }
            });
            tx.transaction.message.instructions.forEach((instruction) => {
                if (is_parsed_instruction_1.SolNative.isParsedInstruction(instruction)) {
                    if (isToken && instruction.program !== 'spl-token') {
                        return;
                    }
                    if (filterOptions.includes(instruction.parsed.type)) {
                        const res = createHistory(searchKey, instruction, tx, directionFilter, mappingTokenAccount, isToken, withMemos);
                        res && hist.push(res);
                    }
                    else {
                        // Only memo
                        if (filterOptions.includes(history_1.Filter.OnlyMemo)) {
                            const res = createMemoHistory(searchKey, instruction, tx, directionFilter);
                            res && hist.push(res);
                        }
                    }
                }
            });
        });
        return hist;
    };
})(SolNative = exports.SolNative || (exports.SolNative = {}));
