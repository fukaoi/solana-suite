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
exports.SolNative = void 0;
const shared_1 = require("@solana-suite/shared");
//@internal
var SolNative;
(function (SolNative) {
    const get = (signature) => __awaiter(this, void 0, void 0, function* () {
        const res = yield shared_1.Node.getConnection().getParsedTransaction(signature);
        if (!res) {
            return {};
        }
        return res;
    });
    SolNative.getByAddress = (pubkey, limit, before, until) => __awaiter(this, void 0, void 0, function* () {
        const transactions = yield shared_1.Node.getConnection().getSignaturesForAddress(pubkey, {
            limit,
            before,
            until,
        });
        const signatures = transactions.map((tx) => get(tx.signature));
        return yield Promise.all(signatures);
    });
})(SolNative = exports.SolNative || (exports.SolNative = {}));
//# sourceMappingURL=get-by-address.js.map