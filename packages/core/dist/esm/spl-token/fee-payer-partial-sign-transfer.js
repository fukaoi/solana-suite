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
import { Node, PartialSignInstruction, Try, } from '@solana-suite/shared';
import { SplToken as _Calculator } from './calculate-amount';
import { AssociatedAccount } from '../associated-account';
export var SplToken;
(function (SplToken) {
    SplToken.feePayerPartialSignTransfer = (mint, owner, dest, signers, amount, mintDecimal, feePayer) => __awaiter(this, void 0, void 0, function* () {
        return Try(() => __awaiter(this, void 0, void 0, function* () {
            const sourceToken = yield AssociatedAccount.makeOrCreateInstruction(mint, owner, feePayer);
            const destToken = yield AssociatedAccount.makeOrCreateInstruction(mint, dest, feePayer);
            let inst2;
            const blockhashObj = yield Node.getConnection().getLatestBlockhash();
            const tx = new Transaction({
                lastValidBlockHeight: blockhashObj.lastValidBlockHeight,
                blockhash: blockhashObj.blockhash,
                feePayer,
            });
            // return associated token account
            if (!destToken.inst) {
                inst2 = createTransferCheckedInstruction(sourceToken.tokenAccount.toPublicKey(), mint, destToken.tokenAccount.toPublicKey(), owner, _Calculator.calculateAmount(amount, mintDecimal), mintDecimal, signers);
                tx.add(inst2);
            }
            else {
                // return instruction and undecided associated token account
                inst2 = createTransferCheckedInstruction(sourceToken.tokenAccount.toPublicKey(), mint, destToken.tokenAccount.toPublicKey(), owner, _Calculator.calculateAmount(amount, mintDecimal), mintDecimal, signers);
                tx.add(destToken.inst).add(inst2);
            }
            tx.recentBlockhash = blockhashObj.blockhash;
            signers.forEach((signer) => {
                tx.partialSign(signer);
            });
            const serializedTx = tx.serialize({
                requireAllSignatures: false,
            });
            const hex = serializedTx.toString('hex');
            return new PartialSignInstruction(hex);
        }));
    });
})(SplToken || (SplToken = {}));
