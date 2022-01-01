"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const shared_1 = require("@solana-suite/shared");
const _1 = require(".");
var Transaction;
(function (Transaction) {
    // type guard
    const isParsedInstructon = (arg) => {
        return arg !== null && typeof arg === 'object' && arg.parsed;
    };
    const filterTransactions = (transactions, filterOptions, inOutFilter) => {
        const hist = [];
        transactions.forEach(tx => {
            tx.transaction.message.instructions.forEach(t => {
                if (isParsedInstructon(t) && filterOptions.includes(t.parsed.type)) {
                    const v = t.parsed;
                    v.date = convertTimestmapToDate(tx.blockTime);
                    v.sig = tx.transaction.signatures[0];
                    if (tx.meta?.innerInstructions && tx.meta?.innerInstructions.length !== 0) {
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
        return shared_1.Node.getConnection().onAccountChange(pubkey, async () => {
            const res = await Transaction.getTransactionHistory(pubkey, [
                Filter.Transfer,
                Filter.TransferChecked
            ]);
            if (res.isErr) {
                return res;
            }
            callback(res.value[0]);
        });
    };
    Transaction.unsubscribeAccount = (subscribeId) => shared_1.Node.getConnection().removeAccountChangeListener(subscribeId);
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
    Transaction.get = async (signature) => {
        const res = await shared_1.Node.getConnection().getParsedConfirmedTransaction(signature)
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
    };
    Transaction.getAll = async (pubkey, limit, before, until) => {
        const transactions = await shared_1.Node.getConnection().getSignaturesForAddress(pubkey, {
            limit,
            before,
            until,
        })
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (transactions.isErr) {
            return shared_1.Result.err(transactions.error);
        }
        else {
            const parsedSig = [];
            for (const tx of transactions.value) {
                const res = await Transaction.get(tx.signature);
                if (res.isErr) {
                    return shared_1.Result.err(res.error);
                }
                res !== null && parsedSig.push(res.value);
            }
            return shared_1.Result.ok(parsedSig);
        }
    };
    Transaction.getTransactionHistory = async (pubkey, filterOptions, limit, transferFilter) => {
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
        let before = undefined;
        while (true) {
            const transactions = await Transaction.getAll(pubkey, bufferedLimit, before);
            console.count('# getTransactionHistory loop');
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
        return shared_1.Result.ok(hist);
    };
    Transaction.getTokenTransactionHistory = async (tokenKey, pubkey, filterOptions, limit, transferFilter) => {
        const tokenPubkey = await _1.Account.findAssocaiatedTokenAddress(pubkey, tokenKey);
        if (tokenPubkey.isErr) {
            return shared_1.Result.err(tokenPubkey.error);
        }
        const filter = filterOptions !== undefined && filterOptions.length > 0
            ? filterOptions
            : [
                Filter.Transfer,
                Filter.TransferChecked,
            ];
        return Transaction.getTransactionHistory(tokenPubkey.value, filter, limit, transferFilter);
    };
    Transaction.getTransferTokenDestinationList = async (pubkey) => {
        const transactions = await Transaction.getAll(pubkey);
        if (transactions.isErr) {
            return shared_1.Result.err(transactions.error);
        }
        const hist = [];
        for (const tx of transactions.unwrap()) {
            const posts = tx.meta?.postTokenBalances;
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
        return shared_1.Result.ok(hist);
    };
    Transaction.confirmedSig = async (signature, commitment = shared_1.Constants.COMMITMENT) => {
        return await shared_1.Node.getConnection().confirmTransaction(signature, commitment)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
    };
})(Transaction = exports.Transaction || (exports.Transaction = {}));
