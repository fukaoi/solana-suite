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
import { Result } from '@solana-suite/shared';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, } from '@solana/spl-token';
export var Internals_SplToken;
(function (Internals_SplToken) {
    Internals_SplToken.findAssociatedTokenAddress = (mint, owner) => __awaiter(this, void 0, void 0, function* () {
        return yield PublicKey.findProgramAddress([owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], ASSOCIATED_TOKEN_PROGRAM_ID)
            .then((v) => Result.ok(v[0]))
            .catch(Result.err);
    });
    Internals_SplToken.calculateAmount = (amount, mintDecimal) => {
        return amount * Math.pow(10, mintDecimal);
    };
})(Internals_SplToken || (Internals_SplToken = {}));
