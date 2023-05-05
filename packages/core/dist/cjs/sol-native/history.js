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
const types_1 = require("../types/");
const transactions_filter_1 = require("../transactions-filter");
const get_by_address_1 = require("./get-by-address");
var SolNative;
(function (SolNative) {
    SolNative.getHistory = (searchPubkey, callback, options) => __awaiter(this, void 0, void 0, function* () {
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
            const transactions = yield get_by_address_1.SolNative.getByAddress(searchPubkey);
            (0, shared_1.debugLog)('# getTransactionHistory loop');
            transactions_filter_1.TransactionsFilter.parse(searchPubkey.toPublicKey(), transactions, actionFilter, false, callback, options.directionFilter);
        }
        catch (e) {
            if (e instanceof Error) {
                callback(shared_1.Result.err(e));
            }
        }
    });
})(SolNative = exports.SolNative || (exports.SolNative = {}));
//# sourceMappingURL=history.js.map