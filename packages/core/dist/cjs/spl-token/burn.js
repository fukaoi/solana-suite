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
const _spl_token_1 = require("../internals/_spl-token");
var SplToken;
(function (SplToken) {
    SplToken.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => __awaiter(this, void 0, void 0, function* () {
        (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const tokenAccount = yield _spl_token_1.Internals_SplToken.findAssociatedTokenAddress(mint, owner);
            const inst = (0, spl_token_1.createBurnCheckedInstruction)(tokenAccount, mint, owner, _spl_token_1.Internals_SplToken.calculateAmount(burnAmount, tokenDecimals), tokenDecimals, signers);
            return new shared_1.Instruction([inst], signers, feePayer);
        }));
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
