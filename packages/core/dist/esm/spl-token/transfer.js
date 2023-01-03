var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createTransferCheckedInstruction } from '@solana/spl-token';
import { Instruction, Try, } from '@solana-suite/shared';
import { SplToken as _Calculator } from './calculate-amount';
import { AssociatedAccount } from '../associated-account';
export var SplToken;
(function (SplToken) {
    SplToken.transfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            !feePayer && (feePayer = signers[0]);
            const sourceToken = yield AssociatedAccount.retryGetOrCreate(mint, owner, feePayer);
            const destToken = yield AssociatedAccount.retryGetOrCreate(mint, dest, feePayer);
            const inst = createTransferCheckedInstruction(sourceToken.toPublicKey(), mint, destToken.toPublicKey(), owner, _Calculator.calculateAmount(amount, mintDecimal), mintDecimal, signers);
            return new Instruction([inst], signers, feePayer);
        }));
    });
})(SplToken || (SplToken = {}));
