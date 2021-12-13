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
const _1 = require("./");
var Transaction;
(function (Transaction) {
    Transaction.get = (signature) => __awaiter(this, void 0, void 0, function* () {
        return yield _1.Node.getConnection().getParsedConfirmedTransaction(signature)
            .then(_1.Result.ok)
            .catch(_1.Result.err);
    });
    Transaction.getAll = (pubkey, limit) => __awaiter(this, void 0, void 0, function* () {
        const transactions = yield _1.Node.getConnection().getConfirmedSignaturesForAddress2(pubkey, { limit })
            .then(_1.Result.ok)
            .catch(_1.Result.err);
        if (transactions.isErr) {
            return transactions;
        }
        else {
            const parsedSig = [];
            for (const tx of transactions.value) {
                const res = yield Transaction.get(tx.signature);
                if (res.isErr)
                    return res;
                res !== null && parsedSig.push(res.value);
            }
            return _1.Result.ok(parsedSig);
        }
    });
    Transaction.confirmedSig = (signature, commitment = _1.Constants.COMMITMENT) => __awaiter(this, void 0, void 0, function* () {
        return yield _1.Node.getConnection().confirmTransaction(signature, commitment)
            .then(_1.Result.ok)
            .catch(_1.Result.err);
    });
})(Transaction = exports.Transaction || (exports.Transaction = {}));
//# sourceMappingURL=transaction.js.map