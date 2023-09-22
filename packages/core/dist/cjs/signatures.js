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
    Signatures.getForAdress = (pubkey, parser, callback, options, histories = []) => __awaiter(this, void 0, void 0, function* () {
        try {
            (0, shared_1.debugLog)("# options: ", options);
            const transactions = yield shared_1.Node.getConnection().getSignaturesForAddress(pubkey.toPublicKey(), {
                limit: options.narrowDown,
            });
            (0, shared_1.debugLog)("# transactions count:", transactions.length);
            for (const transaction of transactions) {
                parseForTransaction(transaction.signature)
                    .then((signature) => {
                    const history = parser(signature);
                    if (history) {
                        histories.push(history);
                        callback(shared_1.Result.ok(histories));
                    }
                })
                    .catch((e) => callback(shared_1.Result.err(e)));
                yield (0, shared_1.sleep)(options.waitTime); // avoid 429 error
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