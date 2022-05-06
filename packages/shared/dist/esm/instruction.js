var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { sendAndConfirmTransaction, Transaction, } from '@solana/web3.js';
import { Node, Result } from './';
const MAX_RETRIES = 3;
export class Instruction {
    constructor(instructions, signers, feePayer, data) {
        this.submit = () => __awaiter(this, void 0, void 0, function* () {
            if (!(this instanceof Instruction)) {
                return Result.err(Error('only Instruction object that can use this'));
            }
            const transaction = new Transaction();
            let finalSigners = this.signers;
            if (this.feePayer) {
                transaction.feePayer = this.feePayer.publicKey;
                finalSigners = [this.feePayer, ...this.signers];
            }
            this.instructions.map(inst => transaction.add(inst));
            const options = {
                maxRetries: MAX_RETRIES
            };
            const rentExempt = yield Node.getConnection().getMinimumBalanceForRentExemption(90);
            return yield sendAndConfirmTransaction(Node.getConnection(), transaction, finalSigners, options)
                .then(Result.ok)
                .catch(Result.err);
        });
        this.instructions = instructions;
        this.signers = signers;
        this.feePayer = feePayer;
        this.data = data;
    }
}
_a = Instruction;
// @internal
Instruction.batchSubmit = (arr) => __awaiter(void 0, void 0, void 0, function* () {
    let i = 0;
    for (const a of arr) {
        if (!a.instructions && !a.signers) {
            return Result.err(Error(`only Instruction object that can use batchSubmit().
            Setted: ${a}, Index: ${i}`));
        }
        i++;
    }
    const instructions = arr.flatMap(a => a.instructions);
    const signers = arr.flatMap(a => a.signers);
    const feePayers = arr.filter(a => a.feePayer !== undefined);
    let feePayer = signers[0];
    if (feePayers.length > 0) {
        feePayer = feePayers[0].feePayer;
    }
    const transaction = new Transaction();
    let finalSigners = signers;
    if (feePayer) {
        transaction.feePayer = feePayer.publicKey;
        finalSigners = [feePayer, ...signers];
    }
    instructions.map(inst => transaction.add(inst));
    const options = {
        maxRetries: MAX_RETRIES
    };
    return yield sendAndConfirmTransaction(Node.getConnection(), transaction, finalSigners, options)
        .then(Result.ok)
        .catch(Result.err);
});
