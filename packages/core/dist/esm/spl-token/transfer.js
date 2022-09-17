var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createTransferCheckedInstruction } from '@solana/spl-token';
import { Transaction } from '@solana/web3.js';
import { Node, Result, Instruction, PartialSignInstruction, } from '@solana-suite/shared';
import { Internals_SplToken } from '../internals/_spl-token';
import { AssociatedAccount } from '../associated-account';
export var SplToken;
(function (SplToken) {
    SplToken.transfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        !feePayer && (feePayer = signers[0]);
        const sourceToken = yield AssociatedAccount.retryGetOrCreate(mint, owner, feePayer);
        if (sourceToken.isErr) {
            return Result.err(sourceToken.error);
        }
        const destToken = yield AssociatedAccount.retryGetOrCreate(mint, dest, feePayer);
        if (destToken.isErr) {
            return Result.err(destToken.error);
        }
        const inst = createTransferCheckedInstruction(sourceToken.value.toPublicKey(), mint, destToken.value.toPublicKey(), owner, Internals_SplToken.calculateAmount(amount, mintDecimal), mintDecimal, signers);
        return Result.ok(new Instruction([inst], signers, feePayer));
    });
    SplToken.feePayerPartialSignTransfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        const sourceToken = yield AssociatedAccount.makeOrCreateInstruction(mint, owner, feePayer);
        const destToken = yield AssociatedAccount.makeOrCreateInstruction(mint, dest, feePayer);
        if (destToken.isErr) {
            return Result.err(destToken.error);
        }
        let inst2;
        const blockhashObj = yield Node.getConnection().getLatestBlockhash();
        const tx = new Transaction({
            lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
            blockhash: blockhashObj.blockhash,
            feePayer,
        });
        // return associated token account
        if (!destToken.value.inst) {
            inst2 = createTransferCheckedInstruction(sourceToken.unwrap().tokenAccount.toPublicKey(), mint, destToken.value.tokenAccount.toPublicKey(), owner, Internals_SplToken.calculateAmount(amount, mintDecimal), mintDecimal, signers);
            tx.add(inst2);
        }
        else {
            // return instruction and undecided associated token account
            inst2 = createTransferCheckedInstruction(sourceToken.unwrap().tokenAccount.toPublicKey(), mint, destToken.value.tokenAccount.toPublicKey(), owner, Internals_SplToken.calculateAmount(amount, mintDecimal), mintDecimal, signers);
            tx.add(destToken.value.inst).add(inst2);
        }
        tx.recentBlockhash = blockhashObj.blockhash;
        signers.forEach((signer) => {
            tx.partialSign(signer);
        });
        try {
            const serializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = serializedTx.toString('hex');
            return Result.ok(new PartialSignInstruction(hex));
        }
        catch (ex) {
            return Result.err(ex);
        }
    });
})(SplToken || (SplToken = {}));
