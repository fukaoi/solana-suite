var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createMintToCheckedInstruction } from '@solana/spl-token';
import { Instruction, Try } from '@solana-suite/shared';
import { AssociatedAccount } from '../associated-account';
import { SplToken as _Calculate } from './calculate-amount';
export var SplToken;
(function (SplToken) {
    SplToken.add = (token, owner, signers, totalAmount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const payer = !feePayer ? signers[0] : feePayer;
            const keypairs = signers.map((s) => s.toKeypair());
            const tokenAssociated = yield AssociatedAccount.retryGetOrCreate(token, owner, payer);
            const inst = createMintToCheckedInstruction(token.toPublicKey(), tokenAssociated.toPublicKey(), owner.toPublicKey(), _Calculate.calculateAmount(totalAmount, mintDecimal), mintDecimal, keypairs);
            return new Instruction([inst], keypairs, payer.toKeypair(), token);
        }));
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=add.js.map