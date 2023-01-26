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
            !feePayer && (feePayer = signers[0]);
            const tokenAssociated = yield AssociatedAccount.retryGetOrCreate(token, owner, feePayer);
            const inst = createMintToCheckedInstruction(token, tokenAssociated.toPublicKey(), owner, _Calculate.calculateAmount(totalAmount, mintDecimal), mintDecimal, signers);
            return new Instruction([inst], signers, feePayer, token.toBase58());
        }));
    });
})(SplToken || (SplToken = {}));
//# sourceMappingURL=add.js.map