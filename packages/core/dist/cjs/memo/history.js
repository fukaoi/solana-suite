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
exports.Memo = void 0;
const types_1 = require("../types/");
const transaction_filter_1 = require("../transaction-filter");
const signatures_1 = require("../signatures");
var Memo;
(function (Memo) {
    Memo.getHistory = (target, onOk, onErr, options = {}) => __awaiter(this, void 0, void 0, function* () {
        try {
            const defaultValues = {
                waitTime: 0.03,
                narrowDown: 100,
            };
            const mergedOptions = Object.assign(Object.assign({}, defaultValues), options);
            const parser = transaction_filter_1.TransactionFilter.parse(types_1.FilterType.OnlyMemo, types_1.ModuleName.SolNative);
            yield signatures_1.Signatures.getForAdress(target, parser, (result) => result.match(onOk, onErr), mergedOptions);
        }
        catch (e) {
            if (e instanceof Error) {
                onErr(e);
            }
        }
    });
})(Memo = exports.Memo || (exports.Memo = {}));
//# sourceMappingURL=history.js.map