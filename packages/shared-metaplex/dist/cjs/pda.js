"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pda = void 0;
const web3_js_1 = require("@solana/web3.js");
const mpl_token_metadata_1 = require("@metaplex-foundation/mpl-token-metadata");
var Pda;
(function (Pda) {
    Pda.getMetadata = (mint) => {
        const [publicKey] = web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from('metadata'),
            mpl_token_metadata_1.PROGRAM_ID.toBuffer(),
            mint.toPublicKey().toBuffer(),
        ], mpl_token_metadata_1.PROGRAM_ID);
        return publicKey;
    };
    Pda.getMasterEdition = (mint) => {
        const [publicKey] = web3_js_1.PublicKey.findProgramAddressSync([
            Buffer.from('metadata'),
            mpl_token_metadata_1.PROGRAM_ID.toBuffer(),
            mint.toPublicKey().toBuffer(),
            Buffer.from('edition'),
        ], mpl_token_metadata_1.PROGRAM_ID);
        return publicKey;
    };
})(Pda = exports.Pda || (exports.Pda = {}));
//# sourceMappingURL=pda.js.map