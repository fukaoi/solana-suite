var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PublicKey } from '@solana/web3.js';
import { Node, Result, Instruction, debugLog, } from '@solana-suite/shared';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getAccount, TokenAccountNotFoundError, TokenInvalidAccountOwnerError, createAssociatedTokenAccountInstruction, } from '@solana/spl-token';
export var Internals_SplToken;
(function (Internals_SplToken) {
    Internals_SplToken.findAssociatedTokenAddress = (mint, owner) => __awaiter(this, void 0, void 0, function* () {
        return yield PublicKey.findProgramAddress([owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], ASSOCIATED_TOKEN_PROGRAM_ID)
            .then((v) => Result.ok(v[0]))
            .catch(Result.err);
    });
    Internals_SplToken.getOrCreateAssociatedTokenAccountInstruction = (mint, owner, feePayer, allowOwnerOffCurve = false) => __awaiter(this, void 0, void 0, function* () {
        const associatedToken = yield getAssociatedTokenAddress(mint, owner, allowOwnerOffCurve, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID)
            .then(Result.ok)
            .catch(Result.err);
        if (associatedToken.isErr) {
            return associatedToken.error;
        }
        const associatedTokenAccount = associatedToken.unwrap();
        debugLog('# associatedTokenAccount: ', associatedTokenAccount.toString());
        try {
            // Dont use Result
            yield getAccount(Node.getConnection(), associatedTokenAccount, Node.getConnection().commitment, TOKEN_PROGRAM_ID);
            return Result.ok({
                tokenAccount: associatedTokenAccount.toString(),
                inst: undefined,
            });
        }
        catch (error) {
            if (!(error instanceof TokenAccountNotFoundError) &&
                !(error instanceof TokenInvalidAccountOwnerError)) {
                return Result.err(Error('Unexpected error'));
            }
            const inst = createAssociatedTokenAccountInstruction(feePayer, associatedTokenAccount, owner, mint, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
            return Result.ok({
                tokenAccount: associatedTokenAccount.toString(),
                inst,
            });
        }
    });
    Internals_SplToken.getOrCreateAssociatedTokenAccount = (mint, owner, feePayer, allowOwnerOffCurve = false) => __awaiter(this, void 0, void 0, function* () {
        const res = yield Internals_SplToken.getOrCreateAssociatedTokenAccountInstruction(mint, owner, feePayer.publicKey, allowOwnerOffCurve);
        if (res.isErr) {
            return Result.err(res.error);
        }
        if (!res.value.inst) {
            return Result.ok(res.value.tokenAccount);
        }
        return Result.ok(new Instruction([res.value.inst], [], feePayer, res.value.tokenAccount));
    });
    Internals_SplToken.calculateAmount = (amount, mintDecimal) => {
        return amount * Math.pow(10, mintDecimal);
    };
})(Internals_SplToken || (Internals_SplToken = {}));
