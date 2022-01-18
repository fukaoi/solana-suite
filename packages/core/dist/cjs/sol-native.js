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
var SolNative;
(function (SolNative) {
    // NOTICE: There is a lamport fluctuation when transfer under 0.001 sol
    // for multiSig only function
    SolNative.transferWithMultisig = (owner, dest, signers, amountSol, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const connection = shared_1.Node.getConnection();
        const payer = feePayer ? feePayer : signers[0];
        const wrapped = yield spl_token_1.Token.createWrappedNativeAccount(connection, spl_token_1.TOKEN_PROGRAM_ID, owner, payer, amountSol * web3_js_1.LAMPORTS_PER_SOL)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (wrapped.isErr) {
            return wrapped.error;
        }
        console.debug('# wrapped sol: ', wrapped.value.toBase58());
        const token = new spl_token_1.Token(connection, shared_1.Constants.WRAPPED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, payer);
        const sourceToken = yield token.getOrCreateAssociatedAccountInfo(owner)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (sourceToken.isErr) {
            return shared_1.Result.err(sourceToken.error);
        }
        const destToken = yield token.getOrCreateAssociatedAccountInfo(wrapped.value)
            .then(shared_1.Result.ok)
            .catch(shared_1.Result.err);
        if (destToken.isErr) {
            return shared_1.Result.err(destToken.error);
        }
        const inst1 = spl_token_1.Token.createTransferInstruction(spl_token_1.TOKEN_PROGRAM_ID, sourceToken.value.address, destToken.value.address, owner, signers, amountSol);
        const inst2 = spl_token_1.Token.createCloseAccountInstruction(spl_token_1.TOKEN_PROGRAM_ID, wrapped.value, dest, owner, signers);
        return shared_1.Result.ok(new shared_1.Instruction([inst1, inst2], signers, feePayer));
    });
    SolNative.transfer = (source, destination, signers, amountSol, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const inst = web3_js_1.SystemProgram.transfer({
            fromPubkey: source,
            toPubkey: destination,
            lamports: amountSol * web3_js_1.LAMPORTS_PER_SOL,
        });
        return shared_1.Result.ok(new shared_1.Instruction([inst], signers, feePayer));
    });
})(SolNative = exports.SolNative || (exports.SolNative = {}));
