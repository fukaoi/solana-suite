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
import { debugLog, Try } from '@solana-suite/shared';
import { Filter } from '../types/history';
import { SolNative as _Get } from '../sol-native/get-by-address';
import { SolNative as _Filter } from '../sol-native/filter-transaction';
export var SplToken;
(function (SplToken) {
    SplToken.getHistory = (mint, target, options) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            if (options === undefined || !Object.keys(options).length) {
                options = {
                    actionFilter: [],
                    directionFilter: undefined,
                };
            }
            const actionFilter = (options === null || options === void 0 ? void 0 : options.actionFilter) !== undefined && options.actionFilter.length > 0
                ? options.actionFilter
                : [Filter.Transfer, Filter.TransferChecked];
            const tokenAccount = yield getAssociatedTokenAddress(mint.toPublicKey(), target.toPublicKey(), true);
            debugLog('# searchKeyAccount: ', tokenAccount.toString());
            const transactions = yield _Get.getByAddress(tokenAccount.toString());
            debugLog('# getTransactionHistory transactions :', transactions);
            return _Filter.filterTransactions(target.toPublicKey(), transactions, actionFilter, true, options.directionFilter);
        }));
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=history.js.map