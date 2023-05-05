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
exports.SplToken = void 0;
const spl_token_1 = require("@solana/spl-token");
const shared_1 = require("@solana-suite/shared");
const types_1 = require("../types/");
const get_by_address_1 = require("../sol-native/get-by-address");
const transactions_filter_1 = require("../transactions-filter");
var SplToken;
(function (SplToken) {
    SplToken.getHistory = (mint, target, callback, options) => __awaiter(this, void 0, void 0, function* () {
        try {
            if (options === undefined || !Object.keys(options).length) {
                options = {
                    actionFilter: [],
                    directionFilter: undefined,
                };
            }
            const actionFilter = (options === null || options === void 0 ? void 0 : options.actionFilter) !== undefined && options.actionFilter.length > 0
                ? options.actionFilter
                : [types_1.FilterType.Transfer, types_1.FilterType.TransferChecked];
            const tokenAccount = yield (0, spl_token_1.getAssociatedTokenAddress)(mint.toPublicKey(), target.toPublicKey(), true);
            (0, shared_1.debugLog)('# tokenAccount: ', tokenAccount.toString());
            const transactions = yield get_by_address_1.SolNative.getByAddress(tokenAccount.toString());
            (0, shared_1.debugLog)('# getTransactionHistory transactions :', transactions);
            transactions_filter_1.TransactionsFilter.parse(target.toPublicKey(), transactions, actionFilter, true, callback, options.directionFilter);
        }
        catch (e) {
            if (e instanceof Error) {
                callback(shared_1.Result.err(e));
            }
        }
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=history.js.map