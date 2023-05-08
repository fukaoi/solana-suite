export var FilterType;
(function (FilterType) {
    FilterType["Transfer"] = "transfer";
    FilterType["Memo"] = "memo";
    FilterType["Mint"] = "mint";
})(FilterType || (FilterType = {}));
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