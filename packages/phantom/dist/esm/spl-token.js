var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MINT_SIZE, createInitializeMintInstruction, TOKEN_PROGRAM_ID, getMinimumBalanceForRentExemptMint, createMintToCheckedInstruction, } from '@solana/spl-token';
import { Transaction, SystemProgram, Keypair, } from '@solana/web3.js';
import { Node, Result } from '@solana-suite/shared';
import { AssociatedAccount } from '@solana-suite/core';
export var SplTokenPhantom;
(function (SplTokenPhantom) {
    const createTokenBuilder = (owner, mintDecimal) => __awaiter(this, void 0, void 0, function* () {
        const connection = Node.getConnection();
        const keypair = Keypair.generate();
        const lamports = yield getMinimumBalanceForRentExemptMint(connection);
        const transaction = new Transaction().add(SystemProgram.createAccount({
            fromPubkey: owner,
            newAccountPubkey: keypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
        }), createInitializeMintInstruction(keypair.publicKey, mintDecimal, owner, owner, TOKEN_PROGRAM_ID));
        transaction.feePayer = owner;
        return { mint: keypair, tx: transaction };
    });
    // select 'new token'
    SplTokenPhantom.mint = (owner, cluster, totalAmount, mintDecimal, phantom) => __awaiter(this, void 0, void 0, function* () {
        Node.changeConnection({ cluster });
        const connection = Node.getConnection();
        const tx = new Transaction();
        const builder = yield createTokenBuilder(owner, mintDecimal);
        const data = yield AssociatedAccount.makeOrCreateInstruction(builder.mint.publicKey, owner);
        tx.add(data.unwrap().inst);
        const txData = {
            tokenAccount: data.unwrap().tokenAccount.toPublicKey(),
            mint: builder.mint,
            tx: builder.tx,
        };
        const transaction = tx.add(createMintToCheckedInstruction(txData.mint.publicKey, txData.tokenAccount, owner, totalAmount, mintDecimal, [], TOKEN_PROGRAM_ID));
        transaction.feePayer = owner;
        const blockhashObj = yield connection.getLatestBlockhashAndContext();
        transaction.recentBlockhash = blockhashObj.value.blockhash;
        transaction.partialSign(builder.mint);
        const signed = yield phantom.signAllTransactions([txData.tx, transaction]);
        // todo: refactoring
        for (const sign of signed) {
            const sig = yield connection
                .sendRawTransaction(sign.serialize())
                .then(Result.ok)
                .catch(Result.err);
            if (sig.isErr) {
                return Result.err(sig.error);
            }
            yield Node.confirmedSig(sig.unwrap());
        }
        return Result.ok(txData.mint.toString());
    });
    // select 'add token'
    SplTokenPhantom.addMinting = (tokenKey, owner, cluster, totalAmount, mintDecimal, phantom) => __awaiter(this, void 0, void 0, function* () {
        Node.changeConnection({ cluster });
        const connection = Node.getConnection();
        const tx = new Transaction();
        const transaction = (yield AssociatedAccount.makeOrCreateInstruction(tokenKey, owner)).unwrap((ok) => {
            tx.add(ok.inst);
            return tx.add(createMintToCheckedInstruction(tokenKey, ok.tokenAccount.toPublicKey(), owner, totalAmount, mintDecimal, [], TOKEN_PROGRAM_ID));
        }, (err) => err);
        if ('message' in transaction) {
            return Result.err(transaction);
        }
        transaction.feePayer = owner;
        const blockhashObj = yield connection.getLatestBlockhashAndContext();
        transaction.recentBlockhash = blockhashObj.value.blockhash;
        const signed = yield phantom.signAllTransactions([transaction]);
        // todo: refactoring
        for (const sign of signed) {
            const sig = yield connection
                .sendRawTransaction(sign.serialize())
                .then(Result.ok)
                .catch(Result.err);
            if (sig.isErr) {
                return Result.err(sig.error);
            }
            yield Node.confirmedSig(sig.unwrap());
        }
        return Result.ok(tokenKey.toBase58());
    });
})(SplTokenPhantom || (SplTokenPhantom = {}));
