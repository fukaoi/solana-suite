"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const shared_1 = require("@solana-suite/shared");
const spl_token_1 = require("@solana/spl-token");
var Transaction;
(function (Transaction) {
    // type guard
    const isParsedInstructon = (arg) => {
        return arg !== null && typeof arg === 'object' && arg.parsed;
    };
    const createHistory = (searchKey, instruction, meta, directionFilter, mappingTokenAccount, isToken, withMemos) => {
        var _a, _b;
        const v = instruction.parsed;
        if (isToken && instruction.program === 'spl-token') {
            const foundSource = mappingTokenAccount.find(m => m.account === v.info.source);
            const foundDest = mappingTokenAccount.find(m => m.account === v.info.destination);
            v.info.source = foundSource.owner;
            v.info.destination = foundDest.owner;
        }
        v.date = convertTimestmapToDate(meta.blockTime);
        v.sig = meta.transaction.signatures[0];
        v.innerInstruction = false;
        if (withMemos && withMemos.length > 0) {
            v.memo = withMemos.find(obj => obj.sig === meta.transaction.signatures).memo;
        }
        // inner instructions
        if (((_a = meta.meta) === null || _a === void 0 ? void 0 : _a.innerInstructions)
            && ((_b = meta.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions.length) !== 0) {
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
            innerInstruction: false
        };
        v.memo = instruction.parsed;
        v.type = instruction.program;
        v.date = convertTimestmapToDate(value.blockTime);
        v.sig = value.transaction.signatures[0];
        v.innerInstruction = false;
        if (((_a = value.meta) === null || _a === void 0 ? void 0 : _a.innerInstructions) && ((_b = value.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions.length) !== 0) {
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
    const filterTransactions = (searchKey, transactions, filterOptions, isToken = false, directionFilter) => {
        const hist = [];
        const mappingTokenAccount = [];
        transactions.forEach(tx => {
            var _a, _b;
            if (tx.isErr)
                return tx;
            const accountKeys = tx.value.transaction.message.accountKeys.map(t => t.pubkey.toBase58());
            // set  mapping list
            (_b = (_a = tx.value.meta) === null || _a === void 0 ? void 0 : _a.postTokenBalances) === null || _b === void 0 ? void 0 : _b.forEach(t => {
                if (accountKeys[t.accountIndex] && t.owner) {
                    const v = {
                        account: accountKeys[t.accountIndex],
                        owner: t.owner
                    };
                    mappingTokenAccount.push(v);
                }
            });
            // set transaction with memo
            const withMemos = [];
            tx.value.transaction.message.instructions.forEach(v => {
                if (isParsedInstructon(v) && v.program === 'spl-memo') {
                    withMemos.push({
                        sig: tx.value.transaction.signatures,
                        memo: v.parsed
                    });
                }
            });
            tx.value.transaction.message.instructions.forEach(instruction => {
                if (isParsedInstructon(instruction)) {
                    if (isToken && instruction.program !== 'spl-token') {
                        return;
                    }
                    if (filterOptions.includes(instruction.parsed.type)) {
                        const res = createHistory(searchKey, instruction, tx.value, directionFilter, mappingTokenAccount, isToken, withMemos);
                        res && hist.push(res);
                    }
                    else {
                        // Only memo
                        if (filterOptions.includes(Filter.OnlyMemo)) {
                            const res = createMemoHistory(searchKey, instruction, tx.value, directionFilter);
                            res && hist.push(res);
                        }
                    }
                }
            });
        });
        return hist;
    };
    const convertTimestmapToDate = (blockTime) => new Date(blockTime * 1000);
    Transaction.subscribeAccount = (pubkey, callback) => {
        return shared_1.Node.getConnection().onAccountChange(pubkey, () => __awaiter(this, void 0, void 0, function* () {
            const res = yield Transaction.getHistory(pubkey, {
                actionFilter: [
                    Filter.Transfer,
                    Filter.TransferChecked
                ]
            });
            if (res.isErr) {
                return res;
            }
            callback(res.value[0]);
        }));
    };
    Transaction.unsubscribeAccount = (subscribeId) => shared_1.Node.getConnection().removeAccountChangeListener(subscribeId);
    let Filter;
    (function (Filter) {
        Filter["Transfer"] = "transfer";
        Filter["TransferChecked"] = "transferChecked";
        Filter["OnlyMemo"] = "spl-memo";
        Filter["MintTo"] = "mintTo";
        Filter["Create"] = "create";
    })(Filter = Transaction.Filter || (Transaction.Filter = {}));
    let DirectionFilter;
    (function (DirectionFilter) {
        DirectionFilter["Dest"] = "destination";
        DirectionFilter["Source"] = "source";
    })(DirectionFilter = Transaction.DirectionFilter || (Transaction.DirectionFilter = {}));
    Transaction.get = (signature) => __awaiter(this, void 0, void 0, function* () {
        const res = yield shared_1.Node.getConnection().getParsedTransaction(signature)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (res.isErr) {
            return shared_1.Result.err(res.error);
        }
        else {
            if (!res.value) {
                return shared_1.Result.ok({});
            }
            return shared_1.Result.ok(res.value);
        }
    });
    Transaction.getForAddress = (pubkey, limit, before, until) => __awaiter(this, void 0, void 0, function* () {
        const transactions = yield shared_1.Node.getConnection().getSignaturesForAddress(pubkey, {
            limit,
            before,
            until,
        })
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (transactions.isErr) {
            return [shared_1.Result.err(transactions.error)];
        }
        else {
            const signatures = transactions.value.map(tx => Transaction.get(tx.signature));
            return yield Promise.all(signatures);
        }
    });
    Transaction.getHistory = (searchPubkey, options) => __awaiter(this, void 0, void 0, function* () {
        if (options === undefined || !Object.keys(options).length) {
            options = {
                limit: 0,
                actionFilter: [],
                directionFilter: undefined,
            };
        }
        const actionFilter = (options === null || options === void 0 ? void 0 : options.actionFilter) !== undefined && options.actionFilter.length > 0
            ? options.actionFilter
            : [
                Filter.Transfer,
                Filter.TransferChecked,
            ];
        let bufferedLimit = 0;
        if (options.limit && options.limit < 50) {
            bufferedLimit = options.limit * 1.5; // To get more data, threshold
        }
        else {
            bufferedLimit = 10;
            options.limit = 10;
        }
        let hist = [];
        let before;
        while (true) {
            const transactions = yield Transaction.getForAddress(searchPubkey, bufferedLimit, before);
            console.debug('# getTransactionHistory loop');
            const res = filterTransactions(searchPubkey, transactions, actionFilter, false, options.directionFilter);
            hist = hist.concat(res);
            if (hist.length >= options.limit || res.length === 0) {
                hist = hist.slice(0, options.limit);
                break;
            }
            before = hist[hist.length - 1].sig;
        }
        return shared_1.Result.ok(hist);
    });
    Transaction.getTokenHistory = (tokenKey, searchPubkey, options) => __awaiter(this, void 0, void 0, function* () {
        if (options === undefined || !Object.keys(options).length) {
            options = {
                limit: 0,
                actionFilter: [],
                directionFilter: undefined,
            };
        }
        const actionFilter = (options === null || options === void 0 ? void 0 : options.actionFilter) !== undefined && options.actionFilter.length > 0
            ? options.actionFilter
            : [
                Filter.Transfer,
                Filter.TransferChecked,
            ];
        const searchKeyAccount = yield (0, spl_token_1.getAssociatedTokenAddress)(tokenKey, searchPubkey, true).then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (searchKeyAccount.isErr) {
            return shared_1.Result.err(searchKeyAccount.error);
        }
        let bufferedLimit = 0;
        if (options.limit && options.limit < 50) {
            bufferedLimit = options.limit * 1.5; // To get more data, threshold
        }
        else {
            bufferedLimit = 10;
            options.limit = 10;
        }
        let hist = [];
        let before;
        while (true) {
            const transactions = yield Transaction.getForAddress(searchKeyAccount.value, bufferedLimit, before);
            console.debug('# getTransactionHistory loop');
            const res = filterTransactions(searchPubkey, transactions, actionFilter, true, options.directionFilter);
            hist = hist.concat(res);
            if (hist.length >= options.limit || res.length === 0) {
                hist = hist.slice(0, options.limit);
                break;
            }
            before = hist[hist.length - 1].sig;
        }
        return shared_1.Result.ok(hist);
    });
    Transaction.confirmedSig = (signature, commitment = shared_1.Constants.COMMITMENT) => __awaiter(this, void 0, void 0, function* () {
        /** @deprecated Instead, call `confirmTransaction` using a `TransactionConfirmationConfig` */
        return yield shared_1.Node.getConnection().confirmTransaction(signature, commitment)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
    });
})(Transaction = exports.Transaction || (exports.Transaction = {}));
