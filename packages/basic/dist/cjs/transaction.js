"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const shared_1 = require("@solana-suite/shared");
var Transaction;
(function (Transaction) {
    Transaction.get = async (signature) => await shared_1.Node.getConnection().getParsedConfirmedTransaction(signature)
        .then(shared_1.Result.ok)
        .catch(shared_1.Result.err);
    Transaction.getAll = async (pubkey, limit) => {
        const transactions = await shared_1.Node.getConnection().getConfirmedSignaturesForAddress2(pubkey, { limit })
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
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
            return shared_1.Result.ok(parsedSig);
        }
    };
    Transaction.confirmedSig = async (signature, commitment = shared_1.Constants.COMMITMENT) => {
        return await shared_1.Node.getConnection().confirmTransaction(signature, commitment)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
    };
})(Transaction = exports.Transaction || (exports.Transaction = {}));
