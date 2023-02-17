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
exports.SolNative = void 0;
const spl_token_1 = require("@solana/spl-token");
const shared_1 = require("@solana-suite/shared");
const associated_account_1 = require("../associated-account");
var SolNative;
(function (SolNative) {
    const RADIX = 10;
    // NOTICE: There is a lamports fluctuation when transfer under 0.001 sol
    // for multiSig only function
    SolNative.transferWithMultisig = (owner, dest, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const connection = shared_1.Node.getConnection();
            const payer = feePayer ? feePayer.toKeypair() : signers[0].toKeypair();
            const keypairs = signers.map((s) => s.toKeypair());
            const wrapped = yield (0, spl_token_1.createWrappedNativeAccount)(connection, payer, owner.toPublicKey(), parseInt(`${amount.toLamports()}`, RADIX));
            (0, shared_1.debugLog)('# wrapped sol: ', wrapped.toBase58());
            const token = yield (0, spl_token_1.createMint)(connection, payer, owner.toPublicKey(), owner.toPublicKey(), 0);
            const sourceToken = yield associated_account_1.AssociatedAccount.retryGetOrCreate(token, owner.toPublicKey(), payer);
            (0, shared_1.debugLog)('# sourceToken: ', sourceToken);
            const destToken = yield associated_account_1.AssociatedAccount.retryGetOrCreate(token, wrapped, payer);
            (0, shared_1.debugLog)('# destToken: ', destToken);
            const inst1 = (0, spl_token_1.createTransferInstruction)(sourceToken.toPublicKey(), destToken.toPublicKey(), owner.toPublicKey(), parseInt(`${amount}`, RADIX), // No lamports, its sol
            keypairs);
            const inst2 = (0, spl_token_1.createCloseAccountInstruction)(wrapped, dest.toPublicKey(), owner.toPublicKey(), keypairs);
            return new shared_1.Instruction([inst1, inst2], keypairs, payer);
        }));
    });
})(SolNative = exports.SolNative || (exports.SolNative = {}));
//# sourceMappingURL=transfer-with-multisig.js.map