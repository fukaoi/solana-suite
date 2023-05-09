"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const core_1 = require("@solana-suite/core");
var Metaplex;
(function (Metaplex) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMALS = 0;
    Metaplex.burn = (mint, owner, signer, feePayer) => {
        return core_1.SplToken.burn(mint, owner, [signer], NFT_AMOUNT, NFT_DECIMALS, feePayer);
    };
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
//# sourceMappingURL=burn.js.map