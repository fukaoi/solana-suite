import { convertTimestampToDateTime } from '@solana-suite/shared';
export var Convert;
(function (Convert) {
    var Mint;
    (function (Mint) {
        Mint.intoUserSide = (output, meta) => {
            var _a, _b;
            const history = {};
            history.mint = output.parsed.info.mint;
            history.mintAuthority = output.parsed.info.mintAuthority;
            history.tokenAmount = output.parsed.info.tokenAmount;
            history.account = output.parsed.info.account;
            history.type = output.program;
            history.dateTime = convertTimestampToDateTime(meta.blockTime);
            history.sig = meta.transaction.signatures[0];
            history.innerInstruction = false;
            if (((_a = meta.meta) === null || _a === void 0 ? void 0 : _a.innerInstructions) &&
                ((_b = meta.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions.length) !== 0) {
                // inner instructions
                history.innerInstruction = true;
            }
            return history;
        };
    })(Mint = Convert.Mint || (Convert.Mint = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=mint.js.map