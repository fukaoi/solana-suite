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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signatures = void 0;
const shared_1 = require("@solana-suite/shared");
//@internal
var Signatures;
(function (Signatures) {
    const parseForTransaction = (signature) => __awaiter(this, void 0, void 0, function* () {
        const res = yield shared_1.Node.getConnection().getParsedTransaction(signature);
        if (!res) {
            return {};
        }
        return res;
    });
    Signatures.getForAdress = (pubkey, parser, callback, limit, before, until) => __awaiter(this, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        try {
            const transactions = yield shared_1.Node.getConnection().getSignaturesForAddress(pubkey.toPublicKey(), {
                limit,
                before,
                until,
            });
            (0, shared_1.debugLog)('# transactions count:', transactions.length);
            try {
                // don't use  Promise.all, this is sync action
                for (var _d = true, transactions_1 = __asyncValues(transactions), transactions_1_1; transactions_1_1 = yield transactions_1.next(), _a = transactions_1_1.done, !_a;) {
                    _c = transactions_1_1.value;
                    _d = false;
                    try {
                        const transaction = _c;
                        const signature = yield parseForTransaction(transaction.signature);
                        const history = parser(signature);
                        if (history) {
                            callback(shared_1.Result.ok(history));
                        }
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = transactions_1.return)) yield _b.call(transactions_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        }
        catch (e) {
            if (e instanceof Error) {
                callback(shared_1.Result.err(e));
            }
        }
    });
})(Signatures = exports.Signatures || (exports.Signatures = {}));
//# sourceMappingURL=signatures.js.map