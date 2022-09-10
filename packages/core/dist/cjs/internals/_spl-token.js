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
exports.Internals_SplToken = void 0;
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
const spl_token_1 = require("@solana/spl-token");
var Internals_SplToken;
(function (Internals_SplToken) {
    Internals_SplToken.findAssociatedTokenAddress = (mint, owner) => __awaiter(this, void 0, void 0, function* () {
        return yield web3_js_1.PublicKey.findProgramAddress([owner.toBuffer(), spl_token_1.TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)
            .then((v) => shared_1.Result.ok(v[0]))
            .catch(shared_1.Result.err);
    });
    Internals_SplToken.getOrCreateAssociatedTokenAccountInstruction = (mint, owner, feePayer, allowOwnerOffCurve = false) => __awaiter(this, void 0, void 0, function* () {
        const associatedToken = yield (0, spl_token_1.getAssociatedTokenAddress)(mint, owner, allowOwnerOffCurve, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (associatedToken.isErr) {
            return associatedToken.error;
        }
        const associatedTokenAccount = associatedToken.unwrap();
        (0, shared_1.debugLog)('# associatedTokenAccount: ', associatedTokenAccount.toString());
        try {
            // Dont use Result
            yield (0, spl_token_1.getAccount)(shared_1.Node.getConnection(), associatedTokenAccount, shared_1.Node.getConnection().commitment, spl_token_1.TOKEN_PROGRAM_ID);
            return shared_1.Result.ok({
                tokenAccount: associatedTokenAccount.toString(),
                inst: undefined,
            });
        }
        catch (error) {
            if (!(error instanceof spl_token_1.TokenAccountNotFoundError) &&
                !(error instanceof spl_token_1.TokenInvalidAccountOwnerError)) {
                return shared_1.Result.err(Error('Unexpected error'));
            }
            const inst = (0, spl_token_1.createAssociatedTokenAccountInstruction)(feePayer, associatedTokenAccount, owner, mint, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID);
            return shared_1.Result.ok({
                tokenAccount: associatedTokenAccount.toString(),
                inst,
            });
        }
    });
    Internals_SplToken.calculateAmount = (amount, mintDecimal) => {
        return amount * Math.pow(10, mintDecimal);
    };
})(Internals_SplToken = exports.Internals_SplToken || (exports.Internals_SplToken = {}));
