var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node, Result, Constants } from './';
export var Transaction;
(function (Transaction) {
    Transaction.get = (signature) => __awaiter(this, void 0, void 0, function* () {
        return yield Node.getConnection().getParsedConfirmedTransaction(signature)
            .then(Result.ok)
            .catch(Result.err);
    });
    Transaction.getAll = (pubkey, limit) => __awaiter(this, void 0, void 0, function* () {
        const transactions = yield Node.getConnection().getConfirmedSignaturesForAddress2(pubkey, { limit })
            .then(Result.ok)
            .catch(Result.err);
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
            return Result.ok(parsedSig);
        }
    });
    Transaction.confirmedSig = (signature, commitment = Constants.COMMITMENT) => __awaiter(this, void 0, void 0, function* () {
        return yield Node.getConnection().confirmTransaction(signature, commitment)
            .then(Result.ok)
            .catch(Result.err);
    });
})(Transaction || (Transaction = {}));
//# sourceMappingURL=transaction.js.map