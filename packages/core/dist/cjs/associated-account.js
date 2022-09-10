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
const _spl_token_1 = require("./internals/_spl-token");
var AssociatedAccount;
(function (AssociatedAccount) {
    const RETRY_OVER_LIMIT = 10;
    const RETRY_SLEEP_TIME = 3;
    AssociatedAccount.get = (mint, owner, feePayer, allowOwnerOffCurve = false) => __awaiter(this, void 0, void 0, function* () {
        const res = yield _spl_token_1.Internals_SplToken.getOrCreateAssociatedTokenAccountInstruction(mint, owner, feePayer.publicKey, allowOwnerOffCurve);
        if (res.isErr) {
            return shared_1.Result.err(res.error);
        }
        if (!res.value.inst) {
            return shared_1.Result.ok(res.value.tokenAccount);
        }
        return shared_1.Result.ok(new shared_1.Instruction([res.value.inst], [], feePayer, res.value.tokenAccount));
    });
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
})(AssociatedAccount = exports.AssociatedAccount || (exports.AssociatedAccount = {}));
