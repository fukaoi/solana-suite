"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const shared_1 = require("@solana-suite/shared");
const shared_metaplex_1 = require("@solana-suite/shared-metaplex");
const spl_token_1 = require("@solana/spl-token");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
var Metaplex;
(function (Metaplex) {
    /**
     * Thawing a target NFT
     * it should set to freezeAuthority when mint()
     *
     * @param {Pubkey} mint             // mint address
     * @param {Pubkey} owner            // current owner
     * @param {Secret} freezeAuthority  // setted freeze authority of nft
     * @param {Secret} feePayer?       // fee payer
     */
    Metaplex.thaw = (mint, owner, freezeAuthority, feePayer) => {
        const payer = feePayer ? feePayer : freezeAuthority;
        return (0, shared_1.Try)(() => {
            const tokenAccount = (0, spl_token_1.getAssociatedTokenAddressSync)(mint.toPublicKey(), owner.toPublicKey());
            const editionAddress = shared_metaplex_1.Pda.getMasterEdition(mint.toPublicKey());
            const inst = (0, mpl_token_metadata_1.createThawDelegatedAccountInstruction)({
                delegate: new shared_1.KeypairAccount({ secret: freezeAuthority }).toPublicKey(),
                tokenAccount: tokenAccount,
                edition: editionAddress,
                mint: mint.toPublicKey(),
            });
            return new shared_1.Instruction([inst], [freezeAuthority.toKeypair()], payer.toKeypair());
        });
    };
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
//# sourceMappingURL=thaw.js.map