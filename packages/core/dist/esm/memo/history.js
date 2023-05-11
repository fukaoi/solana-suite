var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Result } from '@solana-suite/shared';
import { FilterType, ModuleName } from '../types/';
import { TransactionFilter } from '../transaction-filter';
import { Signatures } from '../signatures';
export var Memo;
(function (Memo) {
    Memo.getHistory = (target, callback, narrowDown = 1000 // Max number: 1000
    ) => __awaiter(this, void 0, void 0, function* () {
        try {
            const parser = TransactionFilter.parse(FilterType.OnlyMemo, ModuleName.SolNative);
            yield Signatures.getForAdress(target, parser, callback, narrowDown);
        }
        catch (e) {
            if (e instanceof Error) {
                callback(Result.err(e));
            }
        }
    });
})(Memo || (Memo = {}));
//# sourceMappingURL=history.js.map