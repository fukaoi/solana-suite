"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const shared_1 = require("./shared");
var Convert;
(function (Convert) {
    var Memo;
    (function (Memo) {
        Memo.intoUserSide = (searchKey, output, value, directionFilter) => {
            var _a, _b;
            const history = {};
            history.memo = output.parsed;
            history.type = output.program;
            history.date = shared_1.Convert.Shared.convertTimestampToDate(value.blockTime);
            history.sig = value.transaction.signatures[0];
            history.innerInstruction = false;
            if (((_a = value.meta) === null || _a === void 0 ? void 0 : _a.innerInstructions) &&
                ((_b = value.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions.length) !== 0) {
                // inner instructions
                history.innerInstruction = true;
            }
            if (directionFilter) {
                if (history[directionFilter] === searchKey.toString()) {
                    return history;
                }
            }
            else {
                return history;
            }
        };
    })(Memo = Convert.Memo || (Convert.Memo = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=memo.js.map