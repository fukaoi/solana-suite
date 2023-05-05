var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { debugLog, Result } from '@solana-suite/shared';
import { FilterType } from '../types/';
import { TransactionsFilter } from '../transactions-filter';
import { SolNative as _Get } from './get-by-address';
export var SolNative;
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
                : [FilterType.Transfer, FilterType.TransferChecked];
            const transactions = yield _Get.getByAddress(searchPubkey);
            debugLog('# getTransactionHistory loop');
            TransactionsFilter.parse(searchPubkey.toPublicKey(), transactions, actionFilter, false, callback, options.directionFilter);
        }
        catch (e) {
            if (e instanceof Error) {
                callback(Result.err(e));
            }
        }
    });
})(SolNative || (SolNative = {}));
//# sourceMappingURL=history.js.map