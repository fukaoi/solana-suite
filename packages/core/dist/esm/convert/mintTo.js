import { Convert as _Shared } from './shared';
export var Convert;
(function (Convert) {
    var MintTo;
    (function (MintTo) {
        MintTo.intoUserSide = (searchKey, instruction, value, directionFilter) => {
            var _a, _b;
            const history = {};
            history.memo = instruction.parsed;
            history.type = instruction.program;
            history.date = _Shared.Shared.convertTimestampToDate(value.blockTime);
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
    })(MintTo = Convert.MintTo || (Convert.MintTo = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=mintTo.js.map