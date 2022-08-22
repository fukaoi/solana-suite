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
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
const spl_token_2 = require("./spl-token");
var SolNative;
(function (SolNative) {
    const RADIX = 10;
    // NOTICE: There is a lamports fluctuation when transfer under 0.001 sol
    // for multiSig only function
    SolNative.transferWithMultisig = (owner, dest, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const connection = shared_1.Node.getConnection();
        const payer = feePayer ? feePayer : signers[0];
        const wrapped = yield (0, spl_token_1.createWrappedNativeAccount)(connection, payer, owner, parseInt(`${amount * web3_js_1.LAMPORTS_PER_SOL}`, RADIX))
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (wrapped.isErr) {
            return wrapped.error;
        }
        (0, shared_1.debugLog)('# wrapped sol: ', wrapped.value.toBase58());
        const tokenRes = yield (0, spl_token_1.createMint)(connection, payer, owner, owner, 0)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (tokenRes.isErr) {
            return shared_1.Result.err(tokenRes.error);
        }
        const token = tokenRes.value;
        const sourceToken = yield spl_token_2.SplToken.retryGetOrCreateAssociatedAccountInfo(token, owner, payer);
        if (sourceToken.isErr) {
            return shared_1.Result.err(sourceToken.error);
        }
        (0, shared_1.debugLog)('# sourceToken: ', sourceToken.value);
        const destToken = yield spl_token_2.SplToken.retryGetOrCreateAssociatedAccountInfo(token, wrapped.value, payer);
        if (destToken.isErr) {
            return shared_1.Result.err(destToken.error);
        }
        (0, shared_1.debugLog)('# destToken: ', destToken.value);
        const inst1 = (0, spl_token_1.createTransferInstruction)(sourceToken.value.toPublicKey(), destToken.value.toPublicKey(), owner, parseInt(`${amount}`, RADIX), // No lamports, its sol
        signers);
        const inst2 = (0, spl_token_1.createCloseAccountInstruction)(wrapped.value, dest, owner, signers);
        return shared_1.Result.ok(new shared_1.Instruction([inst1, inst2], signers, feePayer));
    });
    SolNative.transfer = (source, destination, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const inst = web3_js_1.SystemProgram.transfer({
            fromPubkey: source,
            toPubkey: destination,
            lamports: parseInt(`${amount * web3_js_1.LAMPORTS_PER_SOL}`, RADIX),
        });
        return shared_1.Result.ok(new shared_1.Instruction([inst], signers, feePayer));
    });
    SolNative.feePayerPartialSignTransfer = (owner, dest, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const blockHashObj = yield shared_1.Node.getConnection().getLatestBlockhash();
        const tx = new web3_js_1.Transaction({
            blockhash: blockHashObj.blockhash,
            lastValidBlockHeight: blockHashObj.lastValidBlockHeight,
            feePayer
        }).add(web3_js_1.SystemProgram.transfer({
            fromPubkey: owner,
            toPubkey: dest,
            lamports: parseInt(`${amount * web3_js_1.LAMPORTS_PER_SOL}`, RADIX),
        }));
        signers.forEach(signer => {
            tx.partialSign(signer);
        });
        try {
            const serializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = serializedTx.toString('hex');
            return shared_1.Result.ok(new shared_1.PartialSignInstruction(hex));
        }
        catch (ex) {
            return shared_1.Result.err(ex);
        }
    });
})(SolNative = exports.SolNative || (exports.SolNative = {}));
