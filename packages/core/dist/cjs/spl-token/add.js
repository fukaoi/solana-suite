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
const associated_account_1 = require("../associated-account");
const calculate_amount_1 = require("./calculate-amount");
var SplToken;
(function (SplToken) {
    SplToken.add = (token, owner, signers, totalAmount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const payer = !feePayer ? signers[0].toKeypair() : feePayer.toKeypair();
            const keypairs = signers.map((s) => s.toKeypair());
            const tokenAssociated = yield associated_account_1.AssociatedAccount.retryGetOrCreate(token.toPublicKey(), owner.toPublicKey(), payer);
            const inst = (0, spl_token_1.createMintToCheckedInstruction)(token.toPublicKey(), tokenAssociated.toPublicKey(), owner.toPublicKey(), calculate_amount_1.SplToken.calculateAmount(totalAmount, mintDecimal), mintDecimal, keypairs);
            return new shared_1.Instruction([inst], keypairs, payer, token);
        }));
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=add.js.map