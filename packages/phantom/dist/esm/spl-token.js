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
export var SplToken;
(function (SplToken) {
    const initMint = (connection, owner, mintDecimal) => __awaiter(this, void 0, void 0, function* () {
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
        const blockhashObj = yield connection.getRecentBlockhash();
        // since solana v0.1.8
        // const blockhashObj = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhashObj.blockhash;
        transaction.partialSign(keypair);
        return Result.ok({ mint: keypair.publicKey, tx: transaction });
    });
    // select 'new token'
    SplToken.mint = (owner, cluster, totalAmount, mintDecimal, signTransaction) => __awaiter(this, void 0, void 0, function* () {
        Node.changeConnection({ cluster });
        const connection = Node.getConnection();
        const tx = new Transaction();
        const txData = yield (yield initMint(connection, owner, mintDecimal)).unwrap((ok) => __awaiter(this, void 0, void 0, function* () {
            const data = yield AssociatedAccount.makeOrCreateInstruction(ok.mint, owner);
            tx.add(data.unwrap().inst);
            return {
                tokenAccount: data.unwrap().tokenAccount.toPublicKey(),
                mint: ok.mint,
                tx: ok.tx,
            };
        }), (err) => err);
        if ('message' in txData) {
            return Result.err(txData);
        }
        const transaction = tx.add(createMintToCheckedInstruction(txData.mint, txData.tokenAccount, owner, totalAmount, mintDecimal, [], TOKEN_PROGRAM_ID));
        transaction.feePayer = owner;
        const blockhashObj = yield connection.getRecentBlockhash();
        // since solana v0.1.8
        // const blockhashObj = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhashObj.blockhash;
        const signed = yield signTransaction([txData.tx, transaction]);
        for (let sign of signed) {
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
    SplToken.addMinting = (tokenKey, owner, cluster, totalAmount, mintDecimal, signTransaction) => __awaiter(this, void 0, void 0, function* () {
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
        const blockhashObj = yield connection.getRecentBlockhash();
        // since solana v0.1.8
        // const blockhashObj = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhashObj.blockhash;
        const signed = yield signTransaction([transaction]);
        for (let sign of signed) {
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
})(SplToken || (SplToken = {}));
