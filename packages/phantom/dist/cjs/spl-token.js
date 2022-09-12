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
exports.SplToken = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const shared_1 = require("@solana-suite/shared");
const core_1 = require("@solana-suite/core");
var SplToken;
(function (SplToken) {
    const initMint = (connection, owner, mintDecimal) => __awaiter(this, void 0, void 0, function* () {
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
        const blockhashObj = yield connection.getRecentBlockhash();
        // since solana v0.1.8
        // const blockhashObj = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhashObj.blockhash;
        transaction.partialSign(keypair);
        return shared_1.Result.ok({ mint: keypair.publicKey, tx: transaction });
    });
    // select 'new token'
    SplToken.mint = (owner, cluster, totalAmount, mintDecimal, signTransaction) => __awaiter(this, void 0, void 0, function* () {
        shared_1.Node.changeConnection({ cluster });
        const connection = shared_1.Node.getConnection();
        const tx = new web3_js_1.Transaction();
        const txData = yield (yield initMint(connection, owner, mintDecimal)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
            const data = yield core_1.AssociatedAccount.makeOrCreateInstruction(ok.mint, owner);
            tx.add(data.unwrap().inst);
            return {
                tokenAccount: data.unwrap().tokenAccount.toPublicKey(),
                mint: ok.mint,
                tx: ok.tx,
            };
        }), (err) => err);
        if ('message' in txData) {
            return shared_1.Result.err(txData);
        }
        const transaction = tx.add((0, spl_token_1.createMintToCheckedInstruction)(txData.mint, txData.tokenAccount, owner, totalAmount, mintDecimal, [], spl_token_1.TOKEN_PROGRAM_ID));
        transaction.feePayer = owner;
        const blockhashObj = yield connection.getRecentBlockhash();
        // since solana v0.1.8
        // const blockhashObj = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhashObj.blockhash;
        const signed = yield signTransaction([txData.tx, transaction]);
        for (let sign of signed) {
            const sig = yield connection
                .sendRawTransaction(sign.serialize())
                .then(shared_1.Result.ok)
                .catch(shared_1.Result.err);
            if (sig.isErr) {
                return shared_1.Result.err(sig.error);
            }
            yield shared_1.Node.confirmedSig(sig.unwrap());
        }
        return shared_1.Result.ok(txData.mint.toString());
    });
    // select 'add token'
    SplToken.addMinting = (tokenKey, owner, cluster, totalAmount, mintDecimal, signTransaction) => __awaiter(this, void 0, void 0, function* () {
        shared_1.Node.changeConnection({ cluster });
        const connection = shared_1.Node.getConnection();
        const tx = new web3_js_1.Transaction();
        const transaction = (yield core_1.AssociatedAccount.makeOrCreateInstruction(tokenKey, owner)).unwrap((ok) => {
            tx.add(ok.inst);
            return tx.add((0, spl_token_1.createMintToCheckedInstruction)(tokenKey, ok.tokenAccount.toPublicKey(), owner, totalAmount, mintDecimal, [], spl_token_1.TOKEN_PROGRAM_ID));
        }, (err) => err);
        if ('message' in transaction) {
            return shared_1.Result.err(transaction);
        }
        transaction.feePayer = owner;
        const blockhashObj = yield connection.getRecentBlockhash();
        // since solana v0.1.8
        // const blockhashObj = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhashObj.blockhash;
        const signed = yield signTransaction([transaction]);
        for (let sign of signed) {
            const sig = yield connection
                .sendRawTransaction(sign.serialize())
                .then(shared_1.Result.ok)
                .catch(shared_1.Result.err);
            if (sig.isErr) {
                return shared_1.Result.err(sig.error);
            }
            yield shared_1.Node.confirmedSig(sig.unwrap());
        }
        return shared_1.Result.ok(tokenKey.toBase58());
    });
})(SplToken = exports.SplToken || (exports.SplToken = {}));
