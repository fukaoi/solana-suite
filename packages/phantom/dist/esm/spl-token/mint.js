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
import { Node, Try } from '@solana-suite/shared';
import { AssociatedAccount } from '@solana-suite/core';
export var PhantomSplToken;
(function (PhantomSplToken) {
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
        const blockhashObj = yield connection.getLatestBlockhashAndContext();
        transaction.recentBlockhash = blockhashObj.value.blockhash;
        transaction.partialSign(keypair);
        return { mint: keypair, tx: transaction };
    });
    // select 'new token'
    PhantomSplToken.mint = (owner, cluster, totalAmount, mintDecimal, phantom) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            Node.changeConnection({ cluster });
            const connection = Node.getConnection();
            const tx = new Transaction();
            const builder = yield createTokenBuilder(owner, mintDecimal);
            const data = yield AssociatedAccount.makeOrCreateInstruction(builder.mint.publicKey, owner);
            tx.add(data.inst);
            const transaction = tx.add(createMintToCheckedInstruction(builder.mint.publicKey, data.tokenAccount.toPublicKey(), owner, totalAmount, mintDecimal, [], TOKEN_PROGRAM_ID));
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
                yield Node.confirmedSig(sig);
            }
            return builder.mint.publicKey.toString();
        }));
    });
})(PhantomSplToken || (PhantomSplToken = {}));
