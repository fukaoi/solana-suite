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
exports.Internals = void 0;
const shared_1 = require("@solana-suite/shared");
const _spl_token_1 = require("./_spl-token");
var Internals;
(function (Internals) {
    const RETRY_OVER_LIMIT = 10;
    const RETRY_SLEEP_TIME = 3;
    Internals.retryGetOrCreateAssociatedAccountInfo = (mint, owner, feePayer) => __awaiter(this, void 0, void 0, function* () {
        let counter = 1;
        while (counter < RETRY_OVER_LIMIT) {
            try {
                const inst = yield _spl_token_1.Internals_SplToken.getOrCreateAssociatedTokenAccount(mint, owner, feePayer, true);
                if (inst.isOk && typeof inst.value === 'string') {
                    (0, shared_1.debugLog)('# associatedTokenAccount: ', inst.value);
                    return shared_1.Result.ok(inst.value);
                }
                return (yield inst.submit()).map((ok) => {
                    shared_1.Node.confirmedSig(ok);
                    return inst.unwrap().data;
                }, (err) => {
                    (0, shared_1.debugLog)('# Error submit getOrCreateAssociatedTokenAccount: ', err);
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
})(Internals = exports.Internals || (exports.Internals = {}));
