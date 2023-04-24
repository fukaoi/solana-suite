"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SplToken = void 0;
const shared_1 = require("@solana-suite/shared");
const spl_token_1 = require("@solana/spl-token");
var SplToken;
(function (SplToken) {
    /**
     * Freezing a target nft
     * it should set to freezeAuthority when mint()
     * @param {Pubkey} mint             // mint address
     * @param {Pubkey} owner            // current owner
     * @param {Secret} freezeAuthority  // setted freeze authority of nft
     * @param {Secret} feePayer?       // fee payer
     */
    SplToken.freeze = (mint, owner, freezeAuthority, feePayer) => {
        const payer = feePayer ? feePayer : freezeAuthority;
        return (0, shared_1.Try)(() => {
            const tokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(mint.toPublicKey(), owner.toPublicKey());
            const inst = (0, spl_token_1.createFreezeAccountInstruction)(tokenAccount, mint.toPublicKey(), new shared_1.KeypairAccount({ secret: freezeAuthority }).toPublicKey());
            return new shared_1.Instruction([inst], [freezeAuthority.toKeypair()], payer.toKeypair());
        });
    };
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=freeze.js.map