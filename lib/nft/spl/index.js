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
const spl_token_1 = require("@solana/spl-token");
const transaction_1 = require("../../transaction");
const spl_token_2 = require("../../spl-token");
const node_1 = require("../../node");
var SplNft;
(function (SplNft) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMAL = 0;
    SplNft.create = (source, authority = source.publicKey) => {
        return spl_token_2.SplToken.create(source, NFT_AMOUNT, NFT_DECIMAL, authority);
    };
    SplNft.transfer = (tokenKey, source, dest, instruction) => __awaiter(this, void 0, void 0, function* () {
        const token = new spl_token_1.Token(node_1.Node.getConnection(), tokenKey, spl_token_1.TOKEN_PROGRAM_ID, source);
        const sourceTokenAccount = (yield token.getOrCreateAssociatedAccountInfo(source.publicKey)).address;
        const destTokenAccount = (yield token.getOrCreateAssociatedAccountInfo(dest)).address;
        const param = spl_token_1.Token.createTransferCheckedInstruction(spl_token_1.TOKEN_PROGRAM_ID, sourceTokenAccount, tokenKey, destTokenAccount, source.publicKey, [source], NFT_AMOUNT, NFT_DECIMAL);
        const instructions = instruction ? new Array(param, instruction) : [param];
        return transaction_1.Transaction.sendInstructions([source], instructions);
    });
})(SplNft = exports.SplNft || (exports.SplNft = {}));
