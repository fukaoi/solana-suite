var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node } from '@solana-suite/shared';
import { Filter, } from '../types/history';
//@internal
export var Internals_History;
(function (Internals_History) {
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
    const get = (signature) => __awaiter(this, void 0, void 0, function* () {
        const res = yield Node.getConnection().getParsedTransaction(signature);
        if (!res) {
            return {};
        }
        return res;
    });
    // Parsed transaction instruction, Type Guard
    Internals_History.isParsedInstruction = (arg) => {
        return arg !== null && typeof arg === 'object' && 'parsed' in arg;
    };
    Internals_History.filterTransactions = (searchKey, transactions, filterOptions, isToken = false, directionFilter) => {
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
                if (Internals_History.isParsedInstruction(v) && v.program === 'spl-memo') {
                    withMemos.push({
                        sig: tx.transaction.signatures,
                        memo: v.parsed,
                    });
                }
            });
            tx.transaction.message.instructions.forEach((instruction) => {
                if (Internals_History.isParsedInstruction(instruction)) {
                    if (isToken && instruction.program !== 'spl-token') {
                        return;
                    }
                    if (filterOptions.includes(instruction.parsed.type)) {
                        const res = createHistory(searchKey, instruction, tx, directionFilter, mappingTokenAccount, isToken, withMemos);
                        res && hist.push(res);
                    }
                    else {
                        // Only memo
                        if (filterOptions.includes(Filter.OnlyMemo)) {
                            const res = createMemoHistory(searchKey, instruction, tx, directionFilter);
                            res && hist.push(res);
                        }
                    }
                }
            });
        });
        return hist;
    };
    // @todo: internal
    Internals_History.getForAddress = (pubkey, limit, before, until) => __awaiter(this, void 0, void 0, function* () {
        const transactions = yield Node.getConnection().getSignaturesForAddress(pubkey, {
            limit,
            before,
            until,
        });
        const signatures = transactions.map((tx) => get(tx.signature));
        return yield Promise.all(signatures);
    });
})(Internals_History || (Internals_History = {}));
