var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createMint, createMintToCheckedInstruction } from '@solana/spl-token';
import { Node, Result, Instruction } from '@solana-suite/shared';
import { AssociatedAccount } from '../associated-account';
import { Internals_SplToken } from '../internals/_spl-token';
export var SplToken;
(function (SplToken) {
    SplToken.mint = (owner, signers, totalAmount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        !feePayer && (feePayer = signers[0]);
        const connection = Node.getConnection();
        const tokenRes = yield createMint(connection, feePayer, owner, owner, mintDecimal)
            .then(Result.ok)
            .catch(Result.err);
        if (tokenRes.isErr) {
            return Result.err(tokenRes.error);
        }
        const token = tokenRes.value;
        const tokenAssociated = yield AssociatedAccount.retryGetOrCreate(token, owner, feePayer);
        if (tokenAssociated.isErr) {
            return Result.err(tokenAssociated.error);
        }
        const inst = createMintToCheckedInstruction(token, tokenAssociated.value.toPublicKey(), owner, Internals_SplToken.calculateAmount(totalAmount, mintDecimal), mintDecimal, signers);
        return Result.ok(new Instruction([inst], signers, feePayer, token.toBase58()));
    });
})(SplToken || (SplToken = {}));
