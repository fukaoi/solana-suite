"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterOptions = exports.FilterType = void 0;
var FilterType;
(function (FilterType) {
    FilterType["Transfer"] = "transfer";
    FilterType["Memo"] = "memo";
    FilterType["Mint"] = "mint";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
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