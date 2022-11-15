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
import { PublicKey } from '@solana/web3.js';
import { Instruction, Try } from '@solana-suite/shared';
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID, } from '@solana/spl-token';
import { SplToken as Internals_SplToken } from './calculate-amount';
export var SplToken;
(function (SplToken) {
    const findAssociatedTokenAddress = (mint, owner) => __awaiter(this, void 0, void 0, function* () {
        const address = yield PublicKey.findProgramAddress([owner.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()], ASSOCIATED_TOKEN_PROGRAM_ID);
        return address[0];
    });
    SplToken.burn = (mint, owner, signers, burnAmount, tokenDecimals, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const tokenAccount = yield findAssociatedTokenAddress(mint, owner);
            const inst = createBurnCheckedInstruction(tokenAccount, mint, owner, Internals_SplToken.calculateAmount(burnAmount, tokenDecimals), tokenDecimals, signers);
            return new Instruction([inst], signers, feePayer);
        }));
    });
})(SplToken || (SplToken = {}));
