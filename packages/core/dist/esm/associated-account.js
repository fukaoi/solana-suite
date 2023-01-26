var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Node, debugLog, Instruction, sleep } from '@solana-suite/shared';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, getAssociatedTokenAddress, getAccount, TokenAccountNotFoundError, TokenInvalidAccountOwnerError, createAssociatedTokenAccountInstruction, } from '@solana/spl-token';
/**
 * Get Associated token Account.
 * if not created, create new token accouint
 *
 * @param {PublicKey} mint
 * @param {PublicKey} owner
 * @param {PublicKey} feePayer
 * @param {boolean} allowOwnerOffCurve
 * @returns Promise<string | Instruction>
 */
export var AssociatedAccount;
(function (AssociatedAccount) {
    const RETRY_OVER_LIMIT = 10;
    const RETRY_SLEEP_TIME = 3;
    const get = (mint, owner, feePayer, allowOwnerOffCurve = false) => __awaiter(this, void 0, void 0, function* () {
        const res = yield AssociatedAccount.makeOrCreateInstruction(mint, owner, feePayer.publicKey, allowOwnerOffCurve);
        if (!res.inst) {
            return res.tokenAccount;
        }
        return new Instruction([res.inst], [], feePayer, res.tokenAccount);
    });
    /**
     * Retry function if create new token accouint
     *
     * @param {PublicKey} mint
     * @param {PublicKey} owner
     * @param {PublicKey} feePayer
     * @returns Promise<string>
     */
    AssociatedAccount.retryGetOrCreate = (mint, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let counter = 1;
        while (counter < RETRY_OVER_LIMIT) {
            try {
                const inst = yield get(mint, owner, feePayer, true);
                if (inst && typeof inst === 'string') {
                    debugLog('# associatedTokenAccount: ', inst);
                    return inst;
                }
                else if (inst instanceof Instruction) {
                    (yield [inst].submit()).map((ok) => __awaiter(this, void 0, void 0, function* () {
                        yield Node.confirmedSig(ok);
                        return inst.data;
                    }), (err) => {
                        debugLog('# Error submit retryGetOrCreate: ', err);
                        throw err;
                    });
                }
            }
            catch (e) {
                debugLog(`# retry: ${counter} create token account: `, e);
            }
            yield sleep(RETRY_SLEEP_TIME);
            counter++;
        }
        throw Error(`retry action is over limit ${RETRY_OVER_LIMIT}`);
    });
    /**
     * [Main logic]Get Associated token Account.
     * if not created, create new token accouint
     *
     * @param {PublicKey} mint
     * @param {PublicKey} owner
     * @param {PublicKey} feePayer
     * @returns Promise<string>
     */
    AssociatedAccount.makeOrCreateInstruction = (mint, owner, feePayer, allowOwnerOffCurve = false) => __awaiter(this, void 0, void 0, function* () {
        const associatedTokenAccount = yield getAssociatedTokenAddress(mint, owner, allowOwnerOffCurve, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
        debugLog('# associatedTokenAccount: ', associatedTokenAccount.toString());
        try {
            // Dont use Result
            yield getAccount(Node.getConnection(), associatedTokenAccount, Node.getConnection().commitment, TOKEN_PROGRAM_ID);
            return {
                tokenAccount: associatedTokenAccount.toString(),
                inst: undefined,
            };
        }
        catch (error) {
            if (!(error instanceof TokenAccountNotFoundError) &&
                !(error instanceof TokenInvalidAccountOwnerError)) {
                throw Error('Unexpected error');
            }
            const payer = !feePayer ? owner : feePayer;
            const inst = createAssociatedTokenAccountInstruction(payer, associatedTokenAccount, owner, mint, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
            return {
                tokenAccount: associatedTokenAccount.toString(),
                inst,
            };
        }
    });
})(AssociatedAccount || (AssociatedAccount = {}));
//# sourceMappingURL=associated-account.js.map