var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FilterType, ModuleName, } from "../types/";
import { TransactionFilter } from "../transaction-filter";
import { Signatures } from "../signatures";
export var Memo;
(function (Memo) {
    Memo.getHistory = (target, onOk, onErr, options = {}) => __awaiter(this, void 0, void 0, function* () {
        try {
            const defaultValues = {
                waitTime: 0.03,
                narrowDown: 100,
            };
            const mergedOptions = Object.assign(Object.assign({}, defaultValues), options);
            const parser = TransactionFilter.parse(FilterType.OnlyMemo, ModuleName.SolNative);
            yield Signatures.getForAdress(target, parser, (result) => result.match(onOk, onErr), mergedOptions);
        }
        catch (e) {
            if (e instanceof Error) {
                onErr(e);
            }
        }
    });
})(Memo || (Memo = {}));
//# sourceMappingURL=history.js.map