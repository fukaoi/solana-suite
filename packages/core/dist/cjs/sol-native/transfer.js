"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolNative = void 0;
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
var SolNative;
(function (SolNative) {
    const RADIX = 10;
    SolNative.transfer = (source, destination, signers, amount, feePayer) => {
        return (0, shared_1.Try)(() => {
            const inst = web3_js_1.SystemProgram.transfer({
                fromPubkey: source,
                toPubkey: destination,
                lamports: parseInt(`${amount.toLamports()}`, RADIX),
            });
            return new shared_1.Instruction([inst], signers, feePayer);
        });
    };
})(SolNative = exports.SolNative || (exports.SolNative = {}));
