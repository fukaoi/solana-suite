"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterOptions = exports.ModuleName = exports.FilterType = void 0;
var FilterType;
(function (FilterType) {
    FilterType["Memo"] = "memo";
    FilterType["Mint"] = "mint";
    FilterType["OnlyMemo"] = "only-memo";
    FilterType["Transfer"] = "transfer";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
var ModuleName;
(function (ModuleName) {
    ModuleName["SolNative"] = "system";
    ModuleName["SplToken"] = "spl-token";
})(ModuleName = exports.ModuleName || (exports.ModuleName = {}));
exports.FilterOptions = {
    Transfer: {
        program: ['system', 'spl-token'],
        action: ['transfer', 'transferChecked'],
    },
    Memo: {
        program: ['spl-memo'],
        action: ['*'],
    },
    Mint: {
        program: ['spl-token'],
        action: ['mintTo', 'mintToChecked'],
    },
};
//# sourceMappingURL=transaction-filter.js.map