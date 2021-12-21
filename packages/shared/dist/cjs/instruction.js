"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Instructions = exports.Instruction = void 0;
const web3_js_1 = require("@solana/web3.js");
const _1 = require("./");
class Instruction {
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
            return _1.Result.err(Error('only Instruction object that can use this'));
        }
        const transaction = new web3_js_1.Transaction();
        let finalSigners = this.signers;
        if (this.feePayer) {
            transaction.feePayer = this.feePayer.publicKey;
            finalSigners = [this.feePayer, ...this.signers];
        }
        this.instructions.map(inst => transaction.add(inst));
        return await (0, web3_js_1.sendAndConfirmTransaction)(_1.Node.getConnection(), transaction, finalSigners)
            .then(_1.Result.ok)
            .catch(_1.Result.err);
    };
    // @internal
    static batchSubmit = async (arr) => {
        let i = 0;
        console.log(arr);
        for (const a of arr) {
            if (!a.instructions && !a.signers) {
                return _1.Result.err(Error(`only Instruction object that can use batchSubmit().
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
        const transaction = new web3_js_1.Transaction();
        let finalSigners = signers;
        if (feePayer) {
            transaction.feePayer = feePayer.publicKey;
            finalSigners = [feePayer, ...signers];
        }
        instructions.map(inst => transaction.add(inst));
        return await (0, web3_js_1.sendAndConfirmTransaction)(_1.Node.getConnection(), transaction, finalSigners)
            .then(_1.Result.ok)
            .catch(_1.Result.err);
    };
}
exports.Instruction = Instruction;
class Instructions extends Array {
    echo() {
        console.log(this);
    }
}
exports.Instructions = Instructions;
