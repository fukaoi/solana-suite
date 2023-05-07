import { Convert as _Shared } from './shared';
export var Convert;
(function (Convert) {
    var Transfer;
    (function (Transfer) {
        Transfer.intoUserSide = (output, meta) => {
            var _a, _b, _c;
            const history = {};
            // validation check
            if (!output.parsed.info.destination || !output.parsed.info.lamports) {
                return;
            }
            history.source = output.parsed.info.source;
            history.destination = output.parsed.info.destination;
            history.sol = (_a = output.parsed.info.lamports) === null || _a === void 0 ? void 0 : _a.toSol().toString();
            history.date = _Shared.Shared.convertTimestampToDate(meta.blockTime);
            history.sig = meta.transaction.signatures[0];
            history.innerInstruction = false;
            // inner instructions
            if (((_b = meta.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions) &&
                ((_c = meta.meta) === null || _c === void 0 ? void 0 : _c.innerInstructions.length) !== 0) {
                history.innerInstruction = true;
            }
            return history;
        };
    })(Transfer = Convert.Transfer || (Convert.Transfer = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=transfer.js.map