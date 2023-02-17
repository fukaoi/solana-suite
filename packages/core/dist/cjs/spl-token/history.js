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
    SplToken.getHistory = (mint, searchPubkey, options) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            if (options === undefined || !Object.keys(options).length) {
                options = {
                    limit: 0,
                    actionFilter: [],
                    directionFilter: undefined,
                };
            }
            const actionFilter = (options === null || options === void 0 ? void 0 : options.actionFilter) !== undefined && options.actionFilter.length > 0
                ? options.actionFilter
                : [history_1.Filter.Transfer, history_1.Filter.TransferChecked];
            const searchKeyAccount = yield (0, spl_token_1.getAssociatedTokenAddress)(mint.toPublicKey(), searchPubkey.toPublicKey(), true);
            let bufferedLimit = 0;
            if (options.limit && options.limit < 50) {
                bufferedLimit = options.limit * 1.5; // To get more data, threshold
            }
            else {
                bufferedLimit = 10;
                options.limit = 10;
            }
            let hist = [];
            let before;
            (0, shared_1.debugLog)('# searchKeyAccount: ', searchKeyAccount.toString());
            (0, shared_1.debugLog)('# bufferedLimit: ', bufferedLimit);
            (0, shared_1.debugLog)('# before: ', before);
            for (;;) {
                const transactions = yield get_by_address_1.SolNative.getByAddress(searchKeyAccount, bufferedLimit, before);
                (0, shared_1.debugLog)('# getTransactionHistory loop transactions count:', transactions.length);
                const res = filter_transaction_1.SolNative.filterTransactions(searchPubkey.toPublicKey(), transactions, actionFilter, true, options.directionFilter);
                hist = hist.concat(res);
                if (hist.length >= options.limit || res.length === 0) {
                    hist = hist.slice(0, options.limit);
                    break;
                }
                before = hist[hist.length - 1].sig;
            }
            return hist;
        }));
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=history.js.map