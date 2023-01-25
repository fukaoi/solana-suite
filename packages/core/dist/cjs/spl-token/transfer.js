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
const calculate_amount_1 = require("./calculate-amount");
const associated_account_1 = require("../associated-account");
var SplToken;
(function (SplToken) {
    SplToken.transfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            !feePayer && (feePayer = signers[0]);
            const sourceToken = yield associated_account_1.AssociatedAccount.retryGetOrCreate(mint, owner, feePayer);
            const destToken = yield associated_account_1.AssociatedAccount.retryGetOrCreate(mint, dest, feePayer);
            const inst = (0, spl_token_1.createTransferCheckedInstruction)(sourceToken.toPublicKey(), mint, destToken.toPublicKey(), owner, calculate_amount_1.SplToken.calculateAmount(amount, mintDecimal), mintDecimal, signers);
            return new shared_1.Instruction([inst], signers, feePayer);
        }));
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=transfer.js.map