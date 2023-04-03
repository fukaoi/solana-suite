"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplToken = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
const spl_token_2 = require("@solana/spl-token");
const calculate_amount_1 = require("./calculate-amount");
var SplToken;
(function (SplToken) {
    const findAssociatedTokenAddress = (mint, owner) => {
        const address = web3_js_1.PublicKey.findProgramAddressSync([
            owner.toPublicKey().toBuffer(),
            spl_token_2.TOKEN_PROGRAM_ID.toBuffer(),
            mint.toPublicKey().toBuffer(),
        ], spl_token_2.ASSOCIATED_TOKEN_PROGRAM_ID);
        return address[0];
    };
    SplToken.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => {
        return (0, shared_1.Try)(() => {
            const tokenAccount = findAssociatedTokenAddress(mint, owner);
            const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
            const keypairs = signers.map((s) => s.toKeypair());
            const inst = (0, spl_token_1.createBurnCheckedInstruction)(tokenAccount, mint.toPublicKey(), owner.toPublicKey(), calculate_amount_1.SplToken.calculateAmount(burnAmount, tokenDecimals), tokenDecimals, keypairs);
            return new shared_1.Instruction([inst], keypairs, payer);
        });
    };
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=burn.js.map