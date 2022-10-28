var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createBurnCheckedInstruction } from '@solana/spl-token';
import { Instruction, Try } from '@solana-suite/shared';
import { Internals_SplToken } from '../internals/_spl-token';
export var SplToken;
(function (SplToken) {
    SplToken.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const tokenAccount = yield Internals_SplToken.findAssociatedTokenAddress(mint, owner);
            const inst = createBurnCheckedInstruction(tokenAccount, mint, owner, Internals_SplToken.calculateAmount(burnAmount, tokenDecimals), tokenDecimals, signers);
            return new Instruction([inst], signers, feePayer);
        }));
    });
})(SplToken || (SplToken = {}));
