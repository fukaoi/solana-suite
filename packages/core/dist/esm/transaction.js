var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node, Result, Constants } from '@solana-suite/shared';
import { ASSOCIATED_TOKEN_PROGRAM_ID, Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
export var Transaction;
(function (Transaction) {
    // type guard
    const isParsedInstructon = (arg) => {
        return arg !== null && typeof arg === 'object' && arg.parsed;
    };
    const filterTransactions = (transactions, filterOptions, inOutFilter) => {
        const hist = [];
        transactions.forEach(tx => {
            tx.transaction.message.instructions.forEach(t => {
                var _a, _b;
                if (isParsedInstructon(t) && filterOptions.includes(t.parsed.type)) {
                    const v = t.parsed;
                    v.date = convertTimestmapToDate(tx.blockTime);
                    v.sig = tx.transaction.signatures[0];
                    if (((_a = tx.meta) === null || _a === void 0 ? void 0 : _a.innerInstructions) && ((_b = tx.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions.length) !== 0) {
                        // inner instructions
                        v.innerInstruction = true;
                    }
                    else {
                        v.innerInstruction = false;
                    }
                    if (inOutFilter) {
                        if (v.info[inOutFilter.filter] === inOutFilter.pubkey.toString()) {
                            hist.push(v);
                        }
                    }
                    else {
                        hist.push(v);
                    }
                }
            });
        });
        return hist;
    };
    const convertTimestmapToDate = (blockTime) => new Date(blockTime * 1000);
    Transaction.subscribeAccount = (pubkey, callback) => {
        return Node.getConnection().onAccountChange(pubkey, () => __awaiter(this, void 0, void 0, function* () {
            const res = yield Transaction.getTransactionHistory(pubkey, [
                Filter.Transfer,
                Filter.TransferChecked
            ]);
            if (res.isErr) {
                return res;
            }
            callback(res.value[0]);
        }));
    };
    Transaction.unsubscribeAccount = (subscribeId) => Node.getConnection().removeAccountChangeListener(subscribeId);
    let Filter;
    (function (Filter) {
        Filter["Transfer"] = "transfer";
        Filter["TransferChecked"] = "transferChecked";
        Filter["Memo"] = "memo";
        Filter["MintTo"] = "mintTo";
        Filter["Create"] = "create";
    })(Filter = Transaction.Filter || (Transaction.Filter = {}));
    let DirectionType;
    (function (DirectionType) {
        DirectionType["Dest"] = "destination";
        DirectionType["Source"] = "source";
    })(DirectionType = Transaction.DirectionType || (Transaction.DirectionType = {}));
    Transaction.get = (signature) => __awaiter(this, void 0, void 0, function* () {
        const res = yield Node.getConnection().getParsedConfirmedTransaction(signature)
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
    Transaction.getAll = (pubkey, limit, before, until) => __awaiter(this, void 0, void 0, function* () {
        const transactions = yield Node.getConnection().getSignaturesForAddress(pubkey, {
            limit,
            before,
            until,
        })
            .then(Result.ok)
            .catch(Result.err);
        if (transactions.isErr) {
            return Result.err(transactions.error);
        }
        else {
            const parsedSig = [];
            for (const tx of transactions.value) {
                const res = yield Transaction.get(tx.signature);
                if (res.isErr) {
                    return Result.err(res.error);
                }
                res !== null && parsedSig.push(res.value);
            }
            return Result.ok(parsedSig);
        }
    });
    Transaction.getTransactionHistory = (pubkey, filterOptions, limit, transferFilter) => __awaiter(this, void 0, void 0, function* () {
        const filter = filterOptions !== undefined && filterOptions.length > 0
            ? filterOptions
            : [
                Filter.Transfer,
                Filter.TransferChecked,
            ];
        let bufferedLimit = 0;
        if (limit && limit < 980) {
            bufferedLimit = limit + 20;
        }
        else {
            bufferedLimit = 1000;
            limit = 1000;
        }
        let hist = [];
        let before;
        while (true) {
            const transactions = yield Transaction.getAll(pubkey, bufferedLimit, before);
            console.debug('# getTransactionHistory loop');
            if (transactions.isErr) {
                return transactions;
            }
            const tx = transactions.unwrap();
            const res = filterTransactions(tx, filter, transferFilter);
            hist = hist.concat(res);
            if (hist.length >= limit || res.length === 0) {
                hist = hist.slice(0, limit);
                break;
            }
            before = hist[hist.length - 1].sig;
        }
        return Result.ok(hist);
    });
    Transaction.getTokenTransactionHistory = (tokenKey, pubkey, filterOptions, limit, transferFilter) => __awaiter(this, void 0, void 0, function* () {
        const tokenPubkey = yield Token.getAssociatedTokenAddress(ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, tokenKey, pubkey).then(Result.ok)
            .catch(Result.err);
        if (tokenPubkey.isErr) {
            return Result.err(tokenPubkey.error);
        }
        const filter = filterOptions !== undefined && filterOptions.length > 0
            ? filterOptions
            : [
                Filter.Transfer,
                Filter.TransferChecked,
            ];
        return Transaction.getTransactionHistory(tokenPubkey.value, filter, limit, transferFilter);
    });
    Transaction.getTransferTokenDestinationList = (pubkey) => __awaiter(this, void 0, void 0, function* () {
        var _a;
        const transactions = yield Transaction.getAll(pubkey);
        if (transactions.isErr) {
            return Result.err(transactions.error);
        }
        const hist = [];
        for (const tx of transactions.unwrap()) {
            const posts = (_a = tx.meta) === null || _a === void 0 ? void 0 : _a.postTokenBalances;
            if (posts.length > 0) {
                posts.forEach((p) => {
                    const amount = p.uiTokenAmount.uiAmount;
                    if (amount > 0) {
                        const index = p.accountIndex;
                        const dest = tx.transaction.message.accountKeys[index].pubkey;
                        const date = convertTimestmapToDate(tx.blockTime);
                        const v = { dest, date };
                        hist.push(v);
                    }
                });
            }
        }
        return Result.ok(hist);
    });
    Transaction.confirmedSig = (signature, commitment = Constants.COMMITMENT) => __awaiter(this, void 0, void 0, function* () {
        return yield Node.getConnection().confirmTransaction(signature, commitment)
            .then(Result.ok)
            .catch(Result.err);
    });
})(Transaction || (Transaction = {}));
