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
exports.AssociatedAccount = void 0;
const shared_1 = require("@solana-suite/shared");
const spl_token_1 = require("@solana/spl-token");
/**
 * Get Associated token Account.
 * if not created, create new token accouint
 *
 * @param {PublicKey} mint
 * @param {PublicKey} owner
 * @param {PublicKey} feePayer
 * @param {boolean} allowOwnerOffCurve
 * @returns Promise<Result<string | Instruction, Error>>
 */
var AssociatedAccount;
(function (AssociatedAccount) {
    const RETRY_OVER_LIMIT = 10;
    const RETRY_SLEEP_TIME = 3;
    AssociatedAccount.get = (mint, owner, feePayer, allowOwnerOffCurve = false) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const res = yield AssociatedAccount.makeOrCreateInstruction(mint, owner, feePayer.publicKey, allowOwnerOffCurve);
            if (res.isErr) {
                throw res.error;
            }
            if (!res.value.inst) {
                return res.value.tokenAccount;
            }
            return new shared_1.Instruction([res.value.inst], [], feePayer, res.value.tokenAccount);
        }));
    });
    /**
     * Retry function if create new token accouint
     *
     * @param {PublicKey} mint
     * @param {PublicKey} owner
     * @param {PublicKey} feePayer
     * @returns Promise<Result<string, Error>>
     */
    AssociatedAccount.retryGetOrCreate = (mint, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let counter = 1;
        while (counter < RETRY_OVER_LIMIT) {
            try {
                const inst = yield AssociatedAccount.get(mint, owner, feePayer, true);
                if (inst.isOk && typeof inst.value === 'string') {
                    (0, shared_1.debugLog)('# associatedTokenAccount: ', inst.value);
                    return shared_1.Result.ok(inst.value);
                }
                return (yield inst.submit()).map((ok) => {
                    shared_1.Node.confirmedSig(ok);
                    return inst.unwrap().data;
                }, (err) => {
                    (0, shared_1.debugLog)('# Error submit retryGetOrCreate: ', err);
                    throw err;
                });
            }
            catch (e) {
                (0, shared_1.debugLog)(`# retry: ${counter} create token account: `, e);
            }
            yield (0, shared_1.sleep)(RETRY_SLEEP_TIME);
            counter++;
        }
        return shared_1.Result.err(Error(`retry action is over limit ${RETRY_OVER_LIMIT}`));
    });
    /**
     * [Main logic]Get Associated token Account.
     * if not created, create new token accouint
     *
     * @param {PublicKey} mint
     * @param {PublicKey} owner
     * @param {PublicKey} feePayer
     * @returns Promise<Result<string, Error>>
     */
    AssociatedAccount.makeOrCreateInstruction = (mint, owner, feePayer, allowOwnerOffCurve = false) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            const associatedTokenAccount = yield (0, spl_token_1.getAssociatedTokenAddress)(mint, owner, allowOwnerOffCurve, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID);
            (0, shared_1.debugLog)('# associatedTokenAccount: ', associatedTokenAccount.toString());
            try {
                // Dont use Result
                yield (0, spl_token_1.getAccount)(shared_1.Node.getConnection(), associatedTokenAccount, shared_1.Node.getConnection().commitment, spl_token_1.TOKEN_PROGRAM_ID);
                return {
                    tokenAccount: associatedTokenAccount.toString(),
                    inst: undefined,
                };
            }
            catch (error) {
                if (!(error instanceof spl_token_1.TokenAccountNotFoundError) &&
                    !(error instanceof spl_token_1.TokenInvalidAccountOwnerError)) {
                    throw Error('Unexpected error');
                }
                const payer = !feePayer ? owner : feePayer;
                const inst = (0, spl_token_1.createAssociatedTokenAccountInstruction)(payer, associatedTokenAccount, owner, mint, spl_token_1.TOKEN_PROGRAM_ID, spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID);
                return {
                    tokenAccount: associatedTokenAccount.toString(),
                    inst,
                };
            }
        }));
    });
})(AssociatedAccount = exports.AssociatedAccount || (exports.AssociatedAccount = {}));
