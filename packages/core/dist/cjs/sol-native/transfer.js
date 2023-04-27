"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolNative = void 0;
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
var SolNative;
(function (SolNative) {
    const RADIX = 10;
    SolNative.transfer = (source, dest, signers, amount, feePayer) => {
        return (0, shared_1.Try)(() => {
            const inst = web3_js_1.SystemProgram.transfer({
                fromPubkey: source.toPublicKey(),
                toPubkey: dest.toPublicKey(),
                lamports: parseInt(`${amount.toLamports()}`, RADIX),
            });
            const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
            return new shared_1.Instruction([inst], signers.map((s) => s.toKeypair()), payer);
        });
    };
})(SolNative = exports.SolNative || (exports.SolNative = {}));
//# sourceMappingURL=transfer.js.map