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
import { Instruction, Try } from '@solana-suite/shared';
import { SplToken as _Calculator } from './calculate-amount';
import { AssociatedAccount } from '../associated-account';
export var SplToken;
(function (SplToken) {
    SplToken.transfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const payer = feePayer ? feePayer : signers[0];
            const keypairs = signers.map((s) => s.toKeypair());
            const sourceToken = yield AssociatedAccount.retryGetOrCreate(mint, owner, payer);
            const destToken = yield AssociatedAccount.retryGetOrCreate(mint, dest, payer);
            const inst = createTransferCheckedInstruction(sourceToken.toPublicKey(), mint.toPublicKey(), destToken.toPublicKey(), owner.toPublicKey(), _Calculator.calculateAmount(amount, mintDecimal), mintDecimal, keypairs);
            return new Instruction([inst], keypairs, payer.toKeypair());
        }));
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=transfer.js.map