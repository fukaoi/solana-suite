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
exports.SplNft = void 0;
const util_1 = require("../../util");
const spl_token_1 = require("../../spl-token");
var SplNft;
(function (SplNft) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMAL = 0;
    SplNft.create = (sourceSecret, authority = util_1.Util.createKeypair(sourceSecret).publicKey.toBase58()) => {
        return spl_token_1.SplToken.create(sourceSecret, NFT_AMOUNT, NFT_DECIMAL, authority);
    };
    SplNft.transfer = (tokenKey, sourceSecret, destPubkey, instruction) => __awaiter(this, void 0, void 0, function* () {
        return spl_token_1.SplToken.transfer(tokenKey, sourceSecret, destPubkey, NFT_AMOUNT, instruction);
    });
})(SplNft = exports.SplNft || (exports.SplNft = {}));
