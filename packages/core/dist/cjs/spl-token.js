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
exports.SplToken = void 0;
const spl_token_1 = require("@solana/spl-token");
const shared_1 = require("@solana-suite/shared");
var SplToken;
(function (SplToken) {
    const NFT_AMOUNT = 1;
    const NFT_DECIMALS = 0;
    SplToken.mint = (owner, signers, totalAmount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        !feePayer && (feePayer = signers[0]);
        const tokenRes = yield spl_token_1.Token.createMint(shared_1.Node.getConnection(), feePayer, owner, owner, mintDecimal, spl_token_1.TOKEN_PROGRAM_ID)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (tokenRes.isErr) {
            return shared_1.Result.err(tokenRes.error);
        }
        const token = tokenRes.value;
        const tokenAssociated = yield token.getOrCreateAssociatedAccountInfo(owner)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (tokenAssociated.isErr) {
            return shared_1.Result.err(tokenAssociated.error);
        }
        const inst = spl_token_1.Token.createMintToInstruction(spl_token_1.TOKEN_PROGRAM_ID, token.publicKey, tokenAssociated.value.address, owner, signers, totalAmount);
        return shared_1.Result.ok(new shared_1.Instruction([inst], signers, feePayer, token.publicKey.toBase58()));
    });
    SplToken.transfer = (tokenKey, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        !feePayer && (feePayer = signers[0]);
        const token = new spl_token_1.Token(shared_1.Node.getConnection(), tokenKey, spl_token_1.TOKEN_PROGRAM_ID, feePayer);
        const sourceToken = yield token.getOrCreateAssociatedAccountInfo(owner)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (sourceToken.isErr) {
            return shared_1.Result.err(sourceToken.error);
        }
        const destToken = yield token.getOrCreateAssociatedAccountInfo(dest)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (destToken.isErr) {
            return shared_1.Result.err(destToken.error);
        }
        const inst = spl_token_1.Token.createTransferCheckedInstruction(spl_token_1.TOKEN_PROGRAM_ID, sourceToken.value.address, tokenKey, destToken.value.address, owner, signers, amount, mintDecimal);
        return shared_1.Result.ok(new shared_1.Instruction([inst], signers, feePayer));
    });
    SplToken.transferNft = (tokenKey, owner, dest, signers, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return SplToken.transfer(tokenKey, owner, dest, signers, NFT_AMOUNT, NFT_DECIMALS, feePayer);
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
