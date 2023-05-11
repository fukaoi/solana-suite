export var FilterType;
(function (FilterType) {
    FilterType["Memo"] = "memo";
    FilterType["Mint"] = "mint";
    FilterType["OnlyMemo"] = "only-memo";
    FilterType["Transfer"] = "transfer";
})(FilterType || (FilterType = {}));
export var ModuleName;
(function (ModuleName) {
    ModuleName["SolNative"] = "system";
    ModuleName["SplToken"] = "spl-token";
})(ModuleName || (ModuleName = {}));
export const FilterOptions = {
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