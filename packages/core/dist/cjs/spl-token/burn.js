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
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
const spl_token_2 = require("@solana/spl-token");
const calculate_amount_1 = require("./calculate-amount");
var SplToken;
(function (SplToken) {
    const findAssociatedTokenAddress = (mint, owner) => __awaiter(this, void 0, void 0, function* () {
        const address = yield web3_js_1.PublicKey.findProgramAddress([owner.toBuffer(), spl_token_2.TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], spl_token_2.ASSOCIATED_TOKEN_PROGRAM_ID);
        return address[0];
    });
    SplToken.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const tokenAccount = yield findAssociatedTokenAddress(mint, owner);
            const inst = (0, spl_token_1.createBurnCheckedInstruction)(tokenAccount, mint, owner, calculate_amount_1.SplToken.calculateAmount(burnAmount, tokenDecimals), tokenDecimals, signers);
            return new shared_1.Instruction([inst], signers, feePayer);
        }));
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
