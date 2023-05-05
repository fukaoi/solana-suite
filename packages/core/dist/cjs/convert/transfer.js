"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const shared_1 = require("./shared");
var Convert;
(function (Convert) {
    var Transfer;
    (function (Transfer) {
        Transfer.intoUserSide = (searchKey, output, meta, directionFilter, mappingTokenAccount, isToken, withMemos) => {
            var _a, _b, _c;
            const history = {};
            if (isToken && mappingTokenAccount && output.program === 'spl-token') {
                const foundSource = mappingTokenAccount.find((m) => m.account === output.parsed.info.source);
                const foundDest = mappingTokenAccount.find((m) => m.account === output.parsed.info.destination);
                foundSource && (history.source = foundSource.owner);
                foundDest && (history.destination = foundDest.owner);
            }
            history.sol = (_a = output.parsed.info.lamports) === null || _a === void 0 ? void 0 : _a.toSol();
            history.date = shared_1.Convert.Shared.convertTimestampToDate(meta.blockTime);
            history.sig = meta.transaction.signatures[0];
            history.innerInstruction = false;
            if (withMemos && withMemos.length > 0) {
                const finded = withMemos.find((obj) => obj.sig === meta.transaction.signatures);
                finded && (history.memo = finded.memo);
            }
            // inner instructions
            if (((_b = meta.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions) &&
                ((_c = meta.meta) === null || _c === void 0 ? void 0 : _c.innerInstructions.length) !== 0) {
                history.innerInstruction = true;
            }
            if (!directionFilter) {
                return history;
            }
            if (history[directionFilter] === searchKey.toString()) {
                return history;
            }
        };
    })(Transfer = Convert.Transfer || (Convert.Transfer = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=transfer.js.map