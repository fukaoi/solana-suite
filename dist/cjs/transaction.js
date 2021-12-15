"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const _1 = require("./");
var Transaction;
(function (Transaction) {
    Transaction.get = async (signature) => await _1.Node.getConnection().getParsedConfirmedTransaction(signature)
        .then(_1.Result.ok)
        .catch(_1.Result.err);
    Transaction.getAll = async (pubkey, limit) => {
        const transactions = await _1.Node.getConnection().getConfirmedSignaturesForAddress2(pubkey, { limit })
            .then(_1.Result.ok)
            .catch(_1.Result.err);
        if (transactions.isErr) {
            return transactions;
        }
        else {
            const parsedSig = [];
            for (const tx of transactions.value) {
                const res = await Transaction.get(tx.signature);
                if (res.isErr)
                    return res;
                res !== null && parsedSig.push(res.value);
            }
            return _1.Result.ok(parsedSig);
        }
    };
    Transaction.confirmedSig = async (signature, commitment = _1.Constants.COMMITMENT) => {
        return await _1.Node.getConnection().confirmTransaction(signature, commitment)
            .then(_1.Result.ok)
            .catch(_1.Result.err);
    };
})(Transaction = exports.Transaction || (exports.Transaction = {}));
