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
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
var SolNative;
(function (SolNative) {
    const RADIX = 10;
    SolNative.feePayerPartialSignTransfer = (owner, dest, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const blockHashObj = yield shared_1.Node.getConnection().getLatestBlockhash();
            const tx = new web3_js_1.Transaction({
                blockhash: blockHashObj.blockhash,
                lastValidBlockHeight: blockHashObj.lastValidBlockHeight,
                feePayer,
            }).add(web3_js_1.SystemProgram.transfer({
                fromPubkey: owner,
                toPubkey: dest,
                lamports: parseInt(`${amount.toLamports()}`, RADIX),
            }));
            signers.forEach((signer) => {
                tx.partialSign(signer);
            });
            const serializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = serializedTx.toString('hex');
            return new shared_1.PartialSignInstruction(hex);
        }));
    });
})(SolNative = exports.SolNative || (exports.SolNative = {}));
