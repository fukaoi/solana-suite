var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createWrappedNativeAccount, createMint, createTransferInstruction, createCloseAccountInstruction, } from '@solana/spl-token';
import { LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';
import { Result, Node, Instruction, PartialSignInstruction, } from '@solana-suite/shared';
import { SplToken } from './spl-token';
export var SolNative;
(function (SolNative) {
    // NOTICE: There is a lamport fluctuation when transfer under 0.001 sol
    // for multiSig only function
    SolNative.transferWithMultisig = (owner, dest, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const connection = Node.getConnection();
        const payer = feePayer ? feePayer : signers[0];
        const wrapped = yield createWrappedNativeAccount(connection, payer, owner, parseInt(`${amount * LAMPORTS_PER_SOL}`))
            .then(Result.ok)
            .catch(Result.err);
        if (wrapped.isErr) {
            return wrapped.error;
        }
        console.debug('# wrapped sol: ', wrapped.value.toBase58());
        const tokenRes = yield createMint(connection, payer, owner, owner, 0)
            .then(Result.ok)
            .catch(Result.err);
        if (tokenRes.isErr) {
            return Result.err(tokenRes.error);
        }
        const token = tokenRes.value;
        const sourceToken = yield SplToken.retryGetOrCreateAssociatedAccountInfo(token, owner, payer);
        if (sourceToken.isErr) {
            return Result.err(sourceToken.error);
        }
        console.debug('# sourceToken: ', sourceToken.value.address.toString());
        const destToken = yield SplToken.retryGetOrCreateAssociatedAccountInfo(token, wrapped.value, payer);
        if (destToken.isErr) {
            return Result.err(destToken.error);
        }
        console.debug('# destToken: ', destToken.value.address.toString());
        const inst1 = createTransferInstruction(sourceToken.value.address, destToken.value.address, owner, parseInt(`${amount}`), // No lamports, its sol
        signers);
        const inst2 = createCloseAccountInstruction(wrapped.value, dest, owner, signers);
        return Result.ok(new Instruction([inst1, inst2], signers, feePayer));
    });
    SolNative.transfer = (source, destination, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const inst = SystemProgram.transfer({
            fromPubkey: source,
            toPubkey: destination,
            lamports: parseInt(`${amount * LAMPORTS_PER_SOL}`),
        });
        return Result.ok(new Instruction([inst], signers, feePayer));
    });
    SolNative.feePayerPartialSignTransfer = (owner, dest, signers, amount, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const tx = new Transaction({ feePayer })
            .add(SystemProgram.transfer({
            fromPubkey: owner,
            toPubkey: dest,
            lamports: parseInt(`${amount * LAMPORTS_PER_SOL}`),
        }));
        // partially sign transaction
        const blockhashObj = yield Node.getConnection().getLatestBlockhash();
        tx.recentBlockhash = blockhashObj.blockhash;
        signers.forEach(signer => {
            tx.partialSign(signer);
        });
        try {
            const sirializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = sirializedTx.toString('hex');
            return Result.ok(new PartialSignInstruction(hex));
        }
        catch (ex) {
            return Result.err(ex);
        }
    });
})(SolNative || (SolNative = {}));
