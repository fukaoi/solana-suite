import { SplToken } from '@solana-suite/core';
export var Metaplex;
(function (Metaplex) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMALS = 0;
    Metaplex.burn = (mint, owner, signers, feePayer) => {
        return SplToken.burn(mint, owner, signers, NFT_AMOUNT, NFT_DECIMALS, feePayer);
    };
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=burn.js.map