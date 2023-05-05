"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectionFilter = exports.FilterType = void 0;
var FilterType;
(function (FilterType) {
    FilterType["Transfer"] = "transfer";
    FilterType["TransferChecked"] = "transferChecked";
    FilterType["OnlyMemo"] = "spl-memo";
    FilterType["MintTo"] = "mintTo";
})(FilterType = exports.FilterType || (exports.FilterType = {}));
var DirectionFilter;
(function (DirectionFilter) {
    DirectionFilter["Dest"] = "destination";
    DirectionFilter["Source"] = "source";
})(DirectionFilter = exports.DirectionFilter || (exports.DirectionFilter = {}));
//# sourceMappingURL=transactions-filter.js.map