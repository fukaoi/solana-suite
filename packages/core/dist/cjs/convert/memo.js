"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const shared_1 = require("./shared");
var Convert;
(function (Convert) {
    var Memo;
    (function (Memo) {
        Memo.intoUserSide = (output, meta, outputTransfer, mappingTokenAccount) => {
            var _a, _b;
            const history = {};
            // case: transfer with memo
            if (outputTransfer && outputTransfer.program !== '') {
                if (mappingTokenAccount && outputTransfer.program === 'spl-token') {
                    const foundSource = mappingTokenAccount.find((m) => m.account === outputTransfer.parsed.info.source);
                    const foundDest = mappingTokenAccount.find((m) => m.account === outputTransfer.parsed.info.destination);
                    history.mint = outputTransfer.parsed.info.mint;
                    foundSource && (history.source = foundSource.owner);
                    foundDest && (history.destination = foundDest.owner);
                }
                else {
                    history.source = outputTransfer.parsed.info.source;
                    history.destination = outputTransfer.parsed.info.destination;
                }
            }
            history.memo = output.parsed;
            history.type = output.program;
            history.date = shared_1.Convert.Shared.convertTimestampToDate(meta.blockTime);
            history.sig = meta.transaction.signatures[0];
            history.innerInstruction = false;
            if (((_a = meta.meta) === null || _a === void 0 ? void 0 : _a.innerInstructions) &&
                ((_b = meta.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions.length) !== 0) {
                // inner instructions
                history.innerInstruction = true;
            }
            return history;
        };
    })(Memo = Convert.Memo || (Convert.Memo = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=memo.js.map