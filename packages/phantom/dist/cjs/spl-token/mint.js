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
    const createTokenBuilder = (owner, mintDecimal) => __awaiter(this, void 0, void 0, function* () {
        const connection = shared_1.Node.getConnection();
        const keypair = web3_js_1.Keypair.generate();
        const lamports = yield (0, spl_token_1.getMinimumBalanceForRentExemptMint)(connection);
        const transaction = new web3_js_1.Transaction().add(web3_js_1.SystemProgram.createAccount({
            fromPubkey: owner,
            newAccountPubkey: keypair.publicKey,
            space: spl_token_1.MINT_SIZE,
            lamports,
            programId: spl_token_1.TOKEN_PROGRAM_ID,
        }), (0, spl_token_1.createInitializeMintInstruction)(keypair.publicKey, mintDecimal, owner, owner, spl_token_1.TOKEN_PROGRAM_ID));
        transaction.feePayer = owner;
        const blockhashObj = yield connection.getLatestBlockhashAndContext();
        transaction.recentBlockhash = blockhashObj.value.blockhash;
        transaction.partialSign(keypair);
        return { mint: keypair, tx: transaction };
    });
    // select 'new token'
    PhantomSplToken.mint = (owner, cluster, totalAmount, mintDecimal, phantom) => __awaiter(this, void 0, void 0, function* () {
        return (0, shared_1.Try)(() => __awaiter(this, void 0, void 0, function* () {
            shared_1.Node.changeConnection({ cluster });
            const connection = shared_1.Node.getConnection();
            const tx = new web3_js_1.Transaction();
            const builder = yield createTokenBuilder(owner, mintDecimal);
            const data = yield core_1.AssociatedAccount.makeOrCreateInstruction(builder.mint.publicKey, owner);
            tx.add(data.inst);
            const transaction = tx.add((0, spl_token_1.createMintToCheckedInstruction)(builder.mint.publicKey, data.tokenAccount.toPublicKey(), owner, totalAmount, mintDecimal, [], spl_token_1.TOKEN_PROGRAM_ID));
            transaction.feePayer = owner;
            const blockhashObj = yield connection.getLatestBlockhashAndContext();
            transaction.recentBlockhash = blockhashObj.value.blockhash;
            const signed = yield phantom.signAllTransactions([
                builder.tx,
                transaction,
            ]);
            // todo: refactoring
            for (const sign of signed) {
                const sig = yield connection.sendRawTransaction(sign.serialize());
                yield shared_1.Node.confirmedSig(sig);
            }
            return builder.mint.publicKey.toString();
        }));
    });
})(PhantomSplToken = exports.PhantomSplToken || (exports.PhantomSplToken = {}));
//# sourceMappingURL=mint.js.map