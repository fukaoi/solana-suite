"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Convert = void 0;
const shared_1 = require("./shared");
var Convert;
(function (Convert) {
    var Mint;
    (function (Mint) {
        Mint.intoUserSide = (output, value) => {
            var _a, _b;
            const history = {};
            history.mint = output.parsed.info.mint;
            history.mintAuthority = output.parsed.info.mintAuthority;
            history.tokenAmount = output.parsed.info.tokenAmount;
            history.account = output.parsed.info.account;
            history.type = output.program;
            history.date = shared_1.Convert.Shared.convertTimestampToDate(value.blockTime);
            history.sig = value.transaction.signatures[0];
            history.innerInstruction = false;
            if (((_a = value.meta) === null || _a === void 0 ? void 0 : _a.innerInstructions) &&
                ((_b = value.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions.length) !== 0) {
                // inner instructions
                history.innerInstruction = true;
            }
            return history;
        };
    })(Mint = Convert.Mint || (Convert.Mint = {}));
})(Convert = exports.Convert || (exports.Convert = {}));
//# sourceMappingURL=mint.js.map