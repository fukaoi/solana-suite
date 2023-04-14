"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Metaplex = void 0;
const core_1 = require("@solana-suite/core");
var Metaplex;
(function (Metaplex) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMALS = 0;
    Metaplex.feePayerPartialSignTransferNft = (mint, owner, dest, signers, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return core_1.SplToken.feePayerPartialSignTransfer(mint, owner, dest, signers, NFT_AMOUNT, NFT_DECIMALS, feePayer);
    });
})(Metaplex = exports.Metaplex || (exports.Metaplex = {}));
//# sourceMappingURL=fee-payer-partial-sign-transfer.js.map