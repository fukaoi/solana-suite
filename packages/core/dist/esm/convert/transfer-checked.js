import { convertTimestampToDateTime } from '@solana-suite/shared';
export var Convert;
(function (Convert) {
    var TransferChecked;
    (function (TransferChecked) {
        TransferChecked.intoUserSide = (output, meta, mappingTokenAccount) => {
            var _a, _b;
            const history = {};
            if (mappingTokenAccount) {
                const foundSource = mappingTokenAccount.find((m) => m.account === output.parsed.info.source);
                const foundDest = mappingTokenAccount.find((m) => m.account === output.parsed.info.destination);
                foundSource && (history.source = foundSource.owner);
                foundDest && (history.destination = foundDest.owner);
            }
            history.tokenAmount = output.parsed.info.tokenAmount;
            history.mint = output.parsed.info.mint;
            history.multisigAuthority = output.parsed.info.multisigAuthority;
            history.signers = output.parsed.info.signers;
            history.type = output.program;
            history.dateTime = convertTimestampToDateTime(meta.blockTime);
            history.sig = meta.transaction.signatures[0];
            history.innerInstruction = false;
            // inner instructions
            if (((_a = meta.meta) === null || _a === void 0 ? void 0 : _a.innerInstructions) &&
                ((_b = meta.meta) === null || _b === void 0 ? void 0 : _b.innerInstructions.length) !== 0) {
                history.innerInstruction = true;
            }
            return history;
        };
    })(TransferChecked = Convert.TransferChecked || (Convert.TransferChecked = {}));
})(Convert || (Convert = {}));
//# sourceMappingURL=transfer-checked.js.map