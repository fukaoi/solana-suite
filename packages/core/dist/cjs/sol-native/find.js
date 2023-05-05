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
const transactions_filter_1 = require("../transactions-filter");
var SolNative;
(function (SolNative) {
    SolNative.findByOwner = (owner) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const res = yield shared_1.Node.getConnection().getParsedAccountInfo(owner.toPublicKey());
            const info = {
                sol: 0,
                lamports: 0,
                owner: owner.toString(),
            };
            if (transactions_filter_1.TransactionsFilter.isParsedInstruction((_a = res.value) === null || _a === void 0 ? void 0 : _a.data)) {
                const parsedAccountData = (_b = res.value) === null || _b === void 0 ? void 0 : _b.data;
                info.owner = (_d = (_c = parsedAccountData.parsed) === null || _c === void 0 ? void 0 : _c.info) === null || _d === void 0 ? void 0 : _d.owner;
            }
            if (res.value) {
                info.lamports = (_e = res.value) === null || _e === void 0 ? void 0 : _e.lamports;
                info.sol = (_f = res.value) === null || _f === void 0 ? void 0 : _f.lamports.toSol();
            }
            return info;
        }));
    });
})(SolNative = exports.SolNative || (exports.SolNative = {}));
//# sourceMappingURL=find.js.map