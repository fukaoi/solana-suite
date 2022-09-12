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
        return Result.ok({ tokenKey: keypair.publicKey, tx: transaction });
    });
    SplToken.mint = (owner, cluster, totalAmount, mintDecimal, signTransaction) => __awaiter(this, void 0, void 0, function* () {
        Node.changeConnection({ cluster });
        const connection = Node.getConnection();
        const tx = new Transaction();
        const txData1 = yield initMint(connection, owner, mintDecimal);
        if (txData1.isErr) {
            return Result.err(txData1.error);
        }
        const tokenKey = txData1.unwrap().tokenKey;
        const txData2 = yield AssociatedAccount.makeOrCreateInstruction(txData1.unwrap().tokenKey, owner);
        if (txData2.isErr) {
            return Result.err(txData2.error);
        }
        const tokenAccount = txData2.unwrap().tokenAccount.toPublicKey();
        tx.add(txData2.unwrap().inst);
        const transaction = tx.add(createMintToCheckedInstruction(tokenKey, tokenAccount, owner, totalAmount, mintDecimal, [], TOKEN_PROGRAM_ID));
        transaction.feePayer = owner;
        const blockhashObj = yield connection.getRecentBlockhash();
        // since solana v0.1.8
        // const blockhashObj = await connection.getLatestBlockhash();
        transaction.recentBlockhash = blockhashObj.blockhash;
        const signed = yield signTransaction([txData1.unwrap().tx, transaction]);
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
    SplToken.addMinting = (tokenKey, owner, cluster, totalAmount, mintDecimal, signTransaction) => __awaiter(this, void 0, void 0, function* () {
        Node.changeConnection({ cluster });
        const connection = Node.getConnection();
        const tx = new Transaction();
        const txData1 = yield AssociatedAccount.makeOrCreateInstruction(tokenKey, owner);
        if (txData1.isErr)
            return Result.err(txData1.error);
        const tokenAccount = txData1.unwrap().tokenAccount.toPublicKey();
        console.log('tokenAccount: ', tokenAccount);
        console.log('tx: ', txData1.unwrap().inst);
        tx.add(txData1.unwrap().inst);
        const transaction = tx.add(createMintToCheckedInstruction(tokenKey, tokenAccount, owner, totalAmount, mintDecimal, [], TOKEN_PROGRAM_ID));
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
