var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { debugLog, Result } from '@solana-suite/shared';
import { FilterType } from '../types/';
import { SolNative as _Get } from '../sol-native/get-by-address';
import { TransactionsFilter } from '../transactions-filter';
export var SplToken;
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
                : [FilterType.Transfer, FilterType.TransferChecked];
            const tokenAccount = yield getAssociatedTokenAddress(mint.toPublicKey(), target.toPublicKey(), true);
            debugLog('# tokenAccount: ', tokenAccount.toString());
            const transactions = yield _Get.getByAddress(tokenAccount.toString());
            debugLog('# getTransactionHistory transactions :', transactions);
            TransactionsFilter.parse(target.toPublicKey(), transactions, actionFilter, true, callback, options.directionFilter);
        }
        catch (e) {
            if (e instanceof Error) {
                callback(Result.err(e));
            }
        }
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=history.js.map