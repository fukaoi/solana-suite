var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node, Result, debugLog, Instruction, sleep, } from '@solana-suite/shared';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getAccount, TokenAccountNotFoundError, TokenInvalidAccountOwnerError, createAssociatedTokenAccountInstruction, } from '@solana/spl-token';
export var AssociatedAccount;
(function (AssociatedAccount) {
    const RETRY_OVER_LIMIT = 10;
    const RETRY_SLEEP_TIME = 3;
    AssociatedAccount.get = (mint, owner, feePayer, allowOwnerOffCurve = false) => __awaiter(this, void 0, void 0, function* () {
        const res = yield AssociatedAccount.getOrCreateInstruction(mint, owner, feePayer.publicKey, allowOwnerOffCurve);
        if (res.isErr) {
            return Result.err(res.error);
        }
        if (!res.value.inst) {
            return Result.ok(res.value.tokenAccount);
        }
        return Result.ok(new Instruction([res.value.inst], [], feePayer, res.value.tokenAccount));
    });
    AssociatedAccount.retryGetOrCreate = (mint, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let counter = 1;
        while (counter < RETRY_OVER_LIMIT) {
            try {
                const inst = yield AssociatedAccount.get(mint, owner, feePayer, true);
                if (inst.isOk && typeof inst.value === 'string') {
                    debugLog('# associatedTokenAccount: ', inst.value);
                    return Result.ok(inst.value);
                }
                return (yield inst.submit()).map((ok) => {
                    Node.confirmedSig(ok);
                    return inst.unwrap().data;
                }, (err) => {
                    debugLog('# Error submit retryGetOrCreate: ', err);
                    throw err;
                });
            }
            catch (e) {
                debugLog(`# retry: ${counter} create token account: `, e);
            }
            yield sleep(RETRY_SLEEP_TIME);
            counter++;
        }
        return Result.err(Error(`retry action is over limit ${RETRY_OVER_LIMIT}`));
    });
    AssociatedAccount.getOrCreateInstruction = (mint, owner, feePayer, allowOwnerOffCurve = false) => __awaiter(this, void 0, void 0, function* () {
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
            const payer = !feePayer ? owner : feePayer;
            const inst = createAssociatedTokenAccountInstruction(payer, associatedTokenAccount, owner, mint, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
            return Result.ok({
                tokenAccount: associatedTokenAccount.toString(),
                inst,
            });
        }
    });
})(AssociatedAccount || (AssociatedAccount = {}));
