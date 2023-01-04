var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { TOKEN_PROGRAM_ID, createMintToCheckedInstruction, } from '@solana/spl-token';
import { Transaction, } from '@solana/web3.js';
import { Node, Try } from '@solana-suite/shared';
import { AssociatedAccount } from '@solana-suite/core';
export var PhantomSplToken;
(function (PhantomSplToken) {
    PhantomSplToken.add = (tokenKey, owner, cluster, totalAmount, mintDecimal, phantom) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            Node.changeConnection({ cluster });
            const connection = Node.getConnection();
            const transaction = new Transaction();
            const makeInstruction = yield AssociatedAccount.makeOrCreateInstruction(tokenKey, owner);
            transaction.add(makeInstruction.inst);
            transaction.add(createMintToCheckedInstruction(tokenKey, makeInstruction.tokenAccount.toPublicKey(), owner, totalAmount, mintDecimal, [], TOKEN_PROGRAM_ID));
            transaction.feePayer = owner;
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            transaction.recentBlockhash = blockhashObj.value.blockhash;
            const signed = yield phantom.signAllTransactions([transaction]);
            // todo: refactoring
            for (const sign of signed) {
                const sig = yield connection.sendRawTransaction(sign.serialize());
                yield Node.confirmedSig(sig);
            }
            return tokenKey.toBase58();
        }));
    });
})(PhantomSplToken || (PhantomSplToken = {}));
//# sourceMappingURL=add.js.map