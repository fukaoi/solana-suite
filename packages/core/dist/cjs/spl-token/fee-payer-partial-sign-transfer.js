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
const calculate_amount_1 = require("./calculate-amount");
const associated_account_1 = require("../associated-account");
var SplToken;
(function (SplToken) {
    SplToken.feePayerPartialSignTransfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const keypairs = signers.map((s) => s.toKeypair());
            const sourceToken = yield associated_account_1.AssociatedAccount.makeOrCreateInstruction(mint.toPublicKey(), owner.toPublicKey(), feePayer.toPublicKey());
            const destToken = yield associated_account_1.AssociatedAccount.makeOrCreateInstruction(mint.toPublicKey(), dest.toPublicKey(), feePayer.toPublicKey());
            let inst2;
            const blockhashObj = yield shared_1.Node.getConnection().getLatestBlockhash();
            const tx = new web3_js_1.Transaction({
                lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
                blockhash: blockhashObj.blockhash,
                feePayer: feePayer.toPublicKey(),
            });
            // return associated token account
            if (!destToken.inst) {
                inst2 = (0, spl_token_1.createTransferCheckedInstruction)(sourceToken.tokenAccount.toPublicKey(), mint.toPublicKey(), destToken.tokenAccount.toPublicKey(), owner.toPublicKey(), calculate_amount_1.SplToken.calculateAmount(amount, mintDecimal), mintDecimal, keypairs);
                tx.add(inst2);
            }
            else {
                // return instruction and undecided associated token account
                inst2 = (0, spl_token_1.createTransferCheckedInstruction)(sourceToken.tokenAccount.toPublicKey(), mint.toPublicKey(), destToken.tokenAccount.toPublicKey(), owner.toPublicKey(), calculate_amount_1.SplToken.calculateAmount(amount, mintDecimal), mintDecimal, keypairs);
                tx.add(destToken.inst).add(inst2);
            }
            tx.recentBlockhash = blockhashObj.blockhash;
            keypairs.forEach((signer) => {
                tx.partialSign(signer);
            });
            const serializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = serializedTx.toString('hex');
            return new shared_1.PartialSignInstruction(hex);
        }));
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
//# sourceMappingURL=fee-payer-partial-sign-transfer.js.map