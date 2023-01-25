"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectionFilter = exports.Filter = void 0;
var Filter;
(function (Filter) {
    Filter["Transfer"] = "transfer";
    Filter["TransferChecked"] = "transferChecked";
    Filter["OnlyMemo"] = "spl-memo";
    Filter["MintTo"] = "mintTo";
    Filter["Create"] = "create";
})(Filter = exports.Filter || (exports.Filter = {}));
var DirectionFilter;
(function (DirectionFilter) {
    DirectionFilter["Dest"] = "destination";
    DirectionFilter["Source"] = "source";
})(DirectionFilter = exports.DirectionFilter || (exports.DirectionFilter = {}));
//# sourceMappingURL=history.js.map