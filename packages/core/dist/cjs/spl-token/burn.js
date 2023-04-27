"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplToken = void 0;
const spl_token_1 = require("@solana/spl-token");
const shared_1 = require("@solana-suite/shared");
const calculate_amount_1 = require("./calculate-amount");
var SplToken;
(function (SplToken) {
    SplToken.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => {
        return (0, shared_1.Try)(() => {
            const tokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(mint.toPublicKey(), owner.toPublicKey());
            const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
            const keypairs = signers.map((s) => s.toKeypair());
            const inst = (0, spl_token_1.createBurnCheckedInstruction)(tokenAccount, mint.toPublicKey(), owner.toPublicKey(), calculate_amount_1.SplToken.calculateAmount(burnAmount, tokenDecimals), tokenDecimals, keypairs);
            return new shared_1.Instruction([inst], keypairs, payer);
        });
    };
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=burn.js.map