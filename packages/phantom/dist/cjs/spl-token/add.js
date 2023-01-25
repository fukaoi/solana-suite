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
exports.PhantomSplToken = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
const core_1 = require("@solana-suite/core");
var PhantomSplToken;
(function (PhantomSplToken) {
    PhantomSplToken.add = (tokenKey, owner, cluster, totalAmount, mintDecimal, phantom) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            shared_1.Node.changeConnection({ cluster });
            const connection = shared_1.Node.getConnection();
            const transaction = new web3_js_1.Transaction();
            const makeInstruction = yield core_1.AssociatedAccount.makeOrCreateInstruction(tokenKey, owner);
            transaction.add(makeInstruction.inst);
            transaction.add((0, spl_token_1.createMintToCheckedInstruction)(tokenKey, makeInstruction.tokenAccount.toPublicKey(), owner, totalAmount, mintDecimal, [], spl_token_1.TOKEN_PROGRAM_ID));
            transaction.feePayer = owner;
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            transaction.recentBlockhash = blockhashObj.value.blockhash;
            const signed = yield phantom.signAllTransactions([transaction]);
            // todo: refactoring
            for (const sign of signed) {
                const sig = yield connection.sendRawTransaction(sign.serialize());
                yield shared_1.Node.confirmedSig(sig);
            }
            return tokenKey.toBase58();
        }));
    });
})(PhantomSplToken = exports.PhantomSplToken || (exports.PhantomSplToken = {}));
//# sourceMappingURL=add.js.map