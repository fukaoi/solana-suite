var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node, Result, Constants, debugLog, } from '@solana-suite/shared';
import { getAssociatedTokenAddress, } from '@solana/spl-token';
export var Transaction;
(function (Transaction) {
    // type guard
    const isParsedInstruction = (arg) => {
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
        v.date = convertTimestampToDate(meta.blockTime);
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
        v.date = convertTimestampToDate(value.blockTime);
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
                if (isParsedInstruction(v) && v.program === 'spl-memo') {
                    withMemos.push({
                        sig: tx.value.transaction.signatures,
                        memo: v.parsed
                    });
                }
            });
            tx.value.transaction.message.instructions.forEach(instruction => {
                if (isParsedInstruction(instruction)) {
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
    const convertTimestampToDate = (blockTime) => new Date(blockTime * 1000);
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
        const res = yield Node.getConnection().getParsedTransaction(signature)
            .then(Result.ok)
            .catch(Result.err);
        if (res.isErr) {
            return Result.err(res.error);
        }
        else {
            if (!res.value) {
                return Result.ok({});
            }
            return Result.ok(res.value);
        }
    });
    Transaction.getForAddress = (pubkey, limit, before, until) => __awaiter(this, void 0, void 0, function* () {
        const transactions = yield Node.getConnection().getSignaturesForAddress(pubkey, {
            limit,
            before,
            until,
        })
            .then(Result.ok)
            .catch(Result.err);
        if (transactions.isErr) {
            return [Result.err(transactions.error)];
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
            debugLog('# getTransactionHistory loop');
            const res = filterTransactions(searchPubkey, transactions, actionFilter, false, options.directionFilter);
            hist = hist.concat(res);
            if (hist.length >= options.limit || res.length === 0) {
                hist = hist.slice(0, options.limit);
                break;
            }
            before = hist[hist.length - 1].sig;
        }
        return Result.ok(hist);
    });
    Transaction.getTokenHistory = (mint, searchPubkey, options) => __awaiter(this, void 0, void 0, function* () {
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
        const searchKeyAccount = yield getAssociatedTokenAddress(mint, searchPubkey, true).then(Result.ok)
            .catch(Result.err);
        if (searchKeyAccount.isErr) {
            return Result.err(searchKeyAccount.error);
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
            debugLog('# getTransactionHistory loop');
            const res = filterTransactions(searchPubkey, transactions, actionFilter, true, options.directionFilter);
            hist = hist.concat(res);
            if (hist.length >= options.limit || res.length === 0) {
                hist = hist.slice(0, options.limit);
                break;
            }
            before = hist[hist.length - 1].sig;
        }
        return Result.ok(hist);
    });
    Transaction.confirmedSig = (signature, commitment = Constants.COMMITMENT) => __awaiter(this, void 0, void 0, function* () {
        /** @deprecated Instead, call `confirmTransaction` using a `TransactionConfirmationConfig` */
        return yield Node.getConnection().confirmTransaction(signature, commitment)
            .then(Result.ok)
            .catch(Result.err);
    });
})(Transaction || (Transaction = {}));
