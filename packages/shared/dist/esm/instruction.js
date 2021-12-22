import { sendAndConfirmTransaction, Transaction, } from '@solana/web3.js';
import { Node, Result } from './';
export class Instruction {
    instructions;
    signers;
    feePayer;
    data;
    constructor(instructions, signers, feePayer, data) {
        this.instructions = instructions;
        this.signers = signers;
        this.feePayer = feePayer;
        this.data = data;
    }
    submit = async () => {
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
        return await sendAndConfirmTransaction(Node.getConnection(), transaction, finalSigners)
            .then(Result.ok)
            .catch(Result.err);
    };
    // @internal
    static batchSubmit = async (arr) => {
        let i = 0;
        console.log(arr);
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
        return await sendAndConfirmTransaction(Node.getConnection(), transaction, finalSigners)
            .then(Result.ok)
            .catch(Result.err);
    };
}
export class Instructions extends Array {
    echo() {
        console.log(this);
    }
}
