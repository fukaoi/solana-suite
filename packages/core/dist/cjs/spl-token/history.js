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
const history_1 = require("../types/history");
const get_by_address_1 = require("../sol-native/get-by-address");
const filter_transaction_1 = require("../sol-native/filter-transaction");
var SplToken;
(function (SplToken) {
    SplToken.getHistory = (mint, target, options) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            if (options === undefined || !Object.keys(options).length) {
                options = {
                    actionFilter: [],
                    directionFilter: undefined,
                };
            }
            const actionFilter = (options === null || options === void 0 ? void 0 : options.actionFilter) !== undefined && options.actionFilter.length > 0
                ? options.actionFilter
                : [history_1.Filter.Transfer, history_1.Filter.TransferChecked];
            const tokenAccount = yield (0, spl_token_1.getAssociatedTokenAddress)(mint.toPublicKey(), target.toPublicKey(), true);
            (0, shared_1.debugLog)('# searchKeyAccount: ', tokenAccount.toString());
            const transactions = yield get_by_address_1.SolNative.getByAddress(tokenAccount.toString());
            (0, shared_1.debugLog)('# getTransactionHistory transactions :', transactions);
            return filter_transaction_1.SolNative.filterTransactions(target.toPublicKey(), transactions, actionFilter, true, options.directionFilter);
        }));
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=history.js.map