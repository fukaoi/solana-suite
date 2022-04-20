var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Token, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { LAMPORTS_PER_SOL, SystemProgram } from '@solana/web3.js';
import { Result, Node, Constants, Instruction } from '@solana-suite/shared';
import { SplToken } from './spl-token';
export var SolNative;
(function (SolNative) {
    // NOTICE: There is a lamport fluctuation when transfer under 0.001 sol
    // for multiSig only function
    SolNative.transferWithMultisig = (owner, dest, signers, amountSol, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const connection = Node.getConnection();
        const payer = feePayer ? feePayer : signers[0];
        const wrapped = yield Token.createWrappedNativeAccount(connection, TOKEN_PROGRAM_ID, owner, payer, amountSol * LAMPORTS_PER_SOL)
            .then(Result.ok)
            .catch(Result.err);
        if (wrapped.isErr) {
            return wrapped.error;
        }
        console.debug('# wrapped sol: ', wrapped.value.toBase58());
        const token = new Token(connection, Constants.WRAPPED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, payer);
        const sourceToken = yield SplToken.retryGetOrCreateAssociatedAccountInfo(token, owner);
        if (sourceToken.isErr) {
            return Result.err(sourceToken.error);
        }
        const destToken = yield SplToken.retryGetOrCreateAssociatedAccountInfo(token, wrapped.value);
        if (destToken.isErr) {
            return Result.err(destToken.error);
        }
        const inst1 = Token.createTransferInstruction(TOKEN_PROGRAM_ID, sourceToken.value.address, destToken.value.address, owner, signers, amountSol);
        const inst2 = Token.createCloseAccountInstruction(TOKEN_PROGRAM_ID, wrapped.value, dest, owner, signers);
        return Result.ok(new Instruction([inst1, inst2], signers, feePayer));
    });
    SolNative.transfer = (source, destination, signers, amountSol, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const inst = SystemProgram.transfer({
            fromPubkey: source,
            toPubkey: destination,
            lamports: amountSol * LAMPORTS_PER_SOL,
        });
        return Result.ok(new Instruction([inst], signers, feePayer));
    });
})(SolNative || (SolNative = {}));
