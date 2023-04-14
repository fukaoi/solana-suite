var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { SplToken } from '@solana-suite/core';
export var Metaplex;
(function (Metaplex) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMALS = 0;
    Metaplex.transfer = (mint, owner, dest, signers, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return SplToken.transfer(mint, owner, dest, signers, NFT_AMOUNT, NFT_DECIMALS, feePayer);
    });
})(Metaplex || (Metaplex = {}));
//# sourceMappingURL=transfer.js.map